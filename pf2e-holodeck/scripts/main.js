import "./parser.js";

/** Localize / format PF2E-HOLODECK.* keys */
function L(key, data) {
    const path = key.startsWith("PF2E-HOLODECK.") ? key : `PF2E-HOLODECK.${key}`;
    return data ? game.i18n.format(path, data) : game.i18n.localize(path);
}

let holodeckApp;

Hooks.once('init', () => {
    // Database 1: The Public Campaign Logs
    game.settings.register("pf2e-holodeck", "combatHistory", {
        name: "Combat History Logs",
        scope: "world",
        config: false,
        type: Object,
        default: {}
    });

    // Database 2: The Classified Simulation Logs
    game.settings.register("pf2e-holodeck", "holodeckHistory", {
        name: "Holodeck Simulation Logs",
        scope: "world",
        config: false,
        type: Object,
        default: {}
    });

    // Database 3: The Exploration & Roleplay Logs
    game.settings.register("pf2e-holodeck", "explorationHistory", {
        name: "Exploration Logs",
        scope: "world",
        config: false,
        type: Object,
        default: {}
    });

    game.settings.register('pf2e-holodeck', 'matrixId', {
        name: 'Simulation Matrix ID',
        scope: 'world',
        config: false, 
        type: String,
        default: ''
    });

    console.log("PF2e Holodeck | Powering up simulation grid...");

    // Hotkey: Toggle Danger Room
    game.keybindings.register("pf2e-holodeck", "toggleHolodeck", {
        name: "PF2E-HOLODECK.Key.ToggleHolodeck",
        hint: "PF2E-HOLODECK.Key.ToggleHolodeckHint",
        editable: [{ key: "KeyH", modifiers: ["Alt"] }],
        restricted: true, 
        onDown: () => {
            if (!holodeckApp) holodeckApp = new HolodeckHUD();
            
            if (document.querySelector('#holodeck-hud')) {
                holodeckApp.close(); 
            } else {
                holodeckApp.render({ force: true }); 
            }
            return true;
        }
    });

    // Hotkey: Toggle Combat Metrics
    game.keybindings.register("pf2e-holodeck", "toggleParser", {
        name: "PF2E-HOLODECK.Key.ToggleParser",
        hint: "PF2E-HOLODECK.Key.ToggleParserHint",
        editable: [{ key: "KeyM", modifiers: ["Alt"] }],
        restricted: false, 
        onDown: () => {
            if (!window.combatForensicsInstance) {
                window.combatForensicsInstance = new window.CombatForensicsApp();
            }

            // Synced to the new V2 Window ID
            if (document.querySelector('#combat-forensics-ui')) {
                window.combatForensicsInstance.close();
            } else {
                window.combatForensicsInstance.render({force: true});
            }
            return true;
        }
    });
});

Hooks.on("getSceneControlButtons", (controls) => {
    if (!game.user.isGM) return;

    const holodeckTool = {
        name: "holodeck",
        title: game.i18n.localize("PF2E-HOLODECK.Tool.DangerRoom"),
        icon: "fas fa-vr-cardboard",
        visible: true,
        button: true,
        onClick: () => { 
            if (!holodeckApp) holodeckApp = new HolodeckHUD();
            
            if (holodeckApp.rendered) {
                holodeckApp.bringToTop();
            } else {
                holodeckApp.render({force: true});
            }
        }
    };

    let tokenControls;
    if (Array.isArray(controls)) {
        tokenControls = controls.find(c => c.name === "token");
        if (tokenControls && Array.isArray(tokenControls.tools)) {
            tokenControls.tools.push(holodeckTool);
        }
    } 
    else if (controls.tokens || controls.token) {
        tokenControls = controls.tokens || controls.token;
        if (Array.isArray(tokenControls.tools)) {
            tokenControls.tools.push(holodeckTool);
        } else {
            tokenControls.tools["holodeck"] = holodeckTool;
        }
    }
});


Hooks.once('ready', async () => {
    if (!game.user.isGM) return;

    let matrixId = game.settings.get('pf2e-holodeck', 'matrixId');
    let matrix = game.journal.get(matrixId);

    if (!matrix) {
        console.log("PF2e Holodeck | Constructing new Simulation Matrix...");
        
        matrix = await JournalEntry.create({
            name: L("Journal.MatrixName"),
            ownership: { default: 0 },
            flags: {
                "pf2e-holodeck": { "simulations": {} }
            }
        });

        await game.settings.set('pf2e-holodeck', 'matrixId', matrix.id);
    }

    console.log("PF2e Holodeck | Safety protocols engaged. Matrix online.");
});

const { ApplicationV2, HandlebarsApplicationMixin } = foundry.applications.api;

class HolodeckHUD extends HandlebarsApplicationMixin(ApplicationV2) {
    
    static DEFAULT_OPTIONS = {
        id: "holodeck-hud",
        classes: ["holodeck-window"],
        position: { width: 320, height: "auto" },
        window: {
            title: "PF2E-HOLODECK.HUD.Title",
            resizable: false,
            minimizable: true
        },
        actions: {
            toggleSim: async function() { 
                await window.Holodeck.toggleSimulation(); 
                this.render({ force: true });
            },
            createState: async function() {
                const name = this.element.querySelector('#new-state-name').value;
                if (name) { 
                    await window.Holodeck.saveState(name); 
                    this.render({ force: true });
                }
            },
            saveState: async function() {
                const selected = this.element.querySelector('#state-selector').value;
                if (selected) { 
                    await window.Holodeck.saveState(selected); 
                    this.render({ force: true });
                }
            },
            loadState: async function() {
                if (window.CombatParser) await window.CombatParser.saveArchive();
                const selected = this.element.querySelector('#state-selector').value;
                if (selected) await window.Holodeck.loadState(selected);
            },
            deleteState: async function() {
                const selected = this.element.querySelector('#state-selector').value;
                if (selected) {
                    await window.Holodeck.deleteState(selected);
                    this.render({ force: true });
                }
            },
            commitChanges: async function() {
                await window.Holodeck.commitChanges();
            }
        }
    };

    static PARTS = {
        main: { template: "modules/pf2e-holodeck/templates/hud.hbs" }
    };

    async _prepareContext(options) {
        const matrixId = game.settings.get('pf2e-holodeck', 'matrixId');
        const matrix = game.journal.get(matrixId);
        const states = matrix ? matrix.getFlag('pf2e-holodeck', 'simulations') || {} : {};
        const isSimActive = canvas.scene ? canvas.scene.getFlag('pf2e-holodeck', 'active') : false;

        return {
            states: states,
            isSimActive: isSimActive
        };
    }
}

window.Holodeck = {
    toggleSimulation: async function() {
        if (!canvas.scene) {
            ui.notifications.warn(L("Notify.NoScene"));
            return;
        }

        const isSimActive = canvas.scene.getFlag('pf2e-holodeck', 'active');

        if (!isSimActive) {
            console.log("PF2e Holodeck | Initializing Simulation Protocol...");
            
            const backupPayloads = canvas.scene.tokens.map(t => t.toObject());
            await canvas.scene.setFlag('pf2e-holodeck', 'pristineBackup', backupPayloads);

            await this.saveState("Simulation Start");
            await this.loadState("Simulation Start");

            await canvas.scene.setFlag('pf2e-holodeck', 'active', true);
            document.body.classList.add('holodeck-active');

            if (window.CombatParser) window.CombatParser.resetLedger();
            ui.notifications.warn(L("Notify.SimActive"));

        } else {
            console.log("PF2e Holodeck | Deactivating Protocol. Restoring canonical reality...");

            const currentTokenIds = canvas.scene.tokens.map(t => t.id);
            if (currentTokenIds.length > 0) {
                await canvas.scene.deleteEmbeddedDocuments("Token", currentTokenIds);
            }

            const backupPayloads = canvas.scene.getFlag('pf2e-holodeck', 'pristineBackup');
            if (backupPayloads) {
                // Defensive Context: Force Foundry to use the original campaign token IDs
                await canvas.scene.createEmbeddedDocuments("Token", backupPayloads, { keepId: true });
            } else {
                ui.notifications.error(L("Notify.BackupMissing"));
            }

            await canvas.scene.unsetFlag('pf2e-holodeck', 'active');
            await canvas.scene.unsetFlag('pf2e-holodeck', 'pristineBackup');
            
            document.body.classList.remove('holodeck-active');
            ui.notifications.info(L("Notify.SimEnded"));
        }
        
        // Push the update to the UI if it is currently open
        if (window.combatForensicsInstance && window.combatForensicsInstance.rendered) {
            window.combatForensicsInstance.render({ force: true });
        }
    },

    saveState: async function(stateName) {
        if (!canvas.scene) return;
        if (!stateName || stateName.trim() === "") return;

        console.log(`PF2e Holodeck | Serializing reality to state: ${stateName}...`);
        const payloads = [];

        for (let token of canvas.scene.tokens) {
            let tokenData = token.toObject();
            if (tokenData.actorLink) {
                tokenData.actorLink = false;
                // V14 Fix: Added foundry.utils prefix
                foundry.utils.setProperty(tokenData, "flags.pf2e-holodeck.isProtected", true);
            }
            payloads.push(tokenData);
        }

        const matrixId = game.settings.get('pf2e-holodeck', 'matrixId');
        const matrix = game.journal.get(matrixId);

        if (!matrix) {
            ui.notifications.error(L("Notify.MatrixMissing"));
            return;
        }

        let currentStates = matrix.getFlag('pf2e-holodeck', 'simulations') || {};
        currentStates[stateName] = payloads;

        await matrix.setFlag('pf2e-holodeck', 'simulations', currentStates);
        ui.notifications.info(L("Notify.StateSaved", { name: stateName }));
    },

    loadState: async function(stateName) {
        if (!canvas.scene) return;

        const matrixId = game.settings.get('pf2e-holodeck', 'matrixId');
        const matrix = game.journal.get(matrixId);

        if (!matrix) return;

        let currentStates = matrix.getFlag('pf2e-holodeck', 'simulations') || {};
        let payload = currentStates[stateName];

        if (!payload) {
            ui.notifications.error(L("Notify.StateMissing", { name: stateName }));
            return;
        }

        console.log(`PF2e Holodeck | Initiating canvas purge. Loading state: ${stateName}...`);

        const currentTokenIds = canvas.scene.tokens.map(t => t.id);
        if (currentTokenIds.length > 0) {
            await canvas.scene.deleteEmbeddedDocuments("Token", currentTokenIds);
        }

        // Defensive Context: Keep original IDs so history tracking doesn't break
        await canvas.scene.createEmbeddedDocuments("Token", payload, { keepId: true });
        
        ui.notifications.info(L("Notify.StateLoaded", { name: stateName }));
    },

    deleteState: async function(stateName) {
        if (!stateName) return;

        const matrixId = game.settings.get('pf2e-holodeck', 'matrixId');
        const matrix = game.journal.get(matrixId);

        if (!matrix) {
            ui.notifications.error(L("Notify.MatrixMissingShort"));
            return;
        }

        let currentStates = matrix.getFlag('pf2e-holodeck', 'simulations') || {};
        
        if (!currentStates[stateName]) {
            ui.notifications.warn(L("Notify.StateMissingWarn", { name: stateName }));
            return;
        }

        console.log(`PF2e Holodeck | Purging timeline: ${stateName}...`);
        await matrix.setFlag('pf2e-holodeck', `simulations.-=${stateName}`, null);
        ui.notifications.info(L("Notify.StateDeleted", { name: stateName }));
    },

    commitChanges: async function() {
        if (!canvas.scene) return;

        console.log("PF2e Holodeck | Initiating upstream data commit...");

        const matrixId = game.settings.get('pf2e-holodeck', 'matrixId');
        const matrix = game.journal.get(matrixId);
        
        if (!matrix) return;

        let currentStates = matrix.getFlag('pf2e-holodeck', 'simulations') || {};
        let matrixUpdated = false;
        let commitCount = 0;

        for (let token of canvas.scene.tokens) {
            let tokenData = token.toObject();
            // V14 Fix: Added foundry.utils prefix
            if (foundry.utils.getProperty(tokenData, "flags.pf2e-holodeck.isProtected")) continue;

            const baseActor = game.actors.get(token.actorId);
            if (!baseActor) continue; 

            const syntheticActorData = token.actor.toObject();

            await baseActor.update({
                system: syntheticActorData.system,
                items: syntheticActorData.items
            });

            for (let [stateName, payloadArray] of Object.entries(currentStates)) {
                for (let savedToken of payloadArray) {
                    // V14 Fix: Added foundry.utils prefix
                    if (savedToken.actorId === baseActor.id && !foundry.utils.getProperty(savedToken, "flags.pf2e-holodeck.isProtected")) {
                        savedToken.actorData = savedToken.actorData || {};
                        savedToken.actorData.system = syntheticActorData.system;
                        savedToken.actorData.items = syntheticActorData.items;
                        matrixUpdated = true;
                    }
                }
            }
            commitCount++;
        }

        if (matrixUpdated) {
            await matrix.setFlag('pf2e-holodeck', 'simulations', currentStates);
        }

        ui.notifications.info(L("Notify.CommitOk", { count: commitCount }));
    }
};

Hooks.on('canvasReady', () => {
    if (!game.user.isGM) return;
    
    const isSimActive = canvas.scene.getFlag('pf2e-holodeck', 'active');
    if (isSimActive) {
        document.body.classList.add('holodeck-active');
        console.warn("PF2e Holodeck | Canvas loaded with active simulation. Hazard overlay applied.");
    } else {
        document.body.classList.remove('holodeck-active');
    }
});
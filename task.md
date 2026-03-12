# Task Checklist - App Updates (on D:)

- [x] **Preparation**
    - [x] Review current `index.html` and `data.js` structure
- [x] **Data Model Updates**
    - [x] Update `data.js` with `DEAD_POLE`
    - [x] Update `data.js` with `SCENARIO_DEAD_POLES`
    - [x] Update `data.js` with `NEURO_BOXES`
    - [x] Update `window.REFERENCES` to `REFERENCES_UPDATED` structure
- [ ] **UI & Data Synchronization**
    - [/] Sync `SCENARIO_DEAD_POLES` IDs with actual scenarios in `DATA_BY_LEVEL`
    - [/] Refine `TriangleSVG` "mort" pôle detection logic
    - [ ] Update Sources Modal styles (border-l, colors)
    - [ ] Final check of Ethics Mode messages and OvercompensationAlert
    - [ ] Add 6th item to `human_only` lists if missing in any level
- [ ] **Verification**
    - [ ] Use browser to verify all changes
    - [ ] Test scenario creation and automatic "dead pole" detection (if applicable)

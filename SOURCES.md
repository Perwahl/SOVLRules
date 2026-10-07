# Where the rules come from

The rules text describes what the game does. When the game changes, check the matching code below and
update the page. Paths are in the FBS repo, under `Assets/Scripts/` unless they say otherwise. Checked against
FBS `main` on 2026-10-07.

| Rule | Page | Code |
|---|---|---|
| Seven turns, wipe-out, 50-point draw margin | rules/ · battlefield | `BattleSim/Net/GameManager.cs` (end of turn 7, `ScoreDrawMargin`), `BattleSim/Phases/GamePhase.cs` (wipe-out) |
| No Charge phase on turn 1 | turn · charge-phase | `BattleSim/Phases/ChargePhase.cs` `StartPhase` |
| Alternating activations, passing, first player | turn | `BattleSim/Phases/TurnOrder/ActivationRules.cs`, `PriorityController.cs`, `StrategicPhase.cs` (first actor swaps each turn) |
| Unit types: move, base, rank width | units | `ModelTypes.cs` (exported to `src/data/game.json`) |
| Ranks / rank bonus | units · combat-phase | `BattleSim/Net/Unit.cs` `RankBonus`; combat score cap in `BattleSim/Model/CombatRound.cs` `ProccessBreakTests` |
| Wound pool and spill-over | units | `BattleSim/Net/Unit.cs` (`leftOverWounds`) |
| Discipline / break tests, Fearless, crumble | units · combat-phase | `BattleSim/Model/BreakTest.cs` |
| Table sizes, deployment and ambush zones | battlefield | `BattleSim/Table.cs`, `BattleSim/Net/UnitInteractionDeployment.cs` |
| Terrain, line of sight, cover | battlefield | `BattleSim/ContactFilters.cs`, `Assets/3dparty/LineOfSightDemo/Scripts/LineOfSight2D.cs`, `BattleSim/Net/Unit.cs` (cover) |
| Difficult terrain cost, pivots | battlefield · strategic-phase | `BattleSim/MoveRules.cs` |
| Objectives and scoring | battlefield | `ObjectiveManager.cs`, `ObjectiveMarker.cs`, `GameEndScreen/GameEndScreenNew.cs` |
| Charge validity, sides, intercepts, counter-charges | charge-phase | `BattleSim/Phases/ChargePhase.cs` `ValidateChargeTargets` / `CheckValidTarget`, `ChargeFacing.cs`, `UnitChargeHandler.cs` |
| Fleeing from a charge | charge-phase | `UnitChargeHandler.cs` (who may flee), `ChargePhase.cs` `ResolveFleeFromCharge` |
| Ranged attacks | strategic-phase | `BattleSim/RangedAttackRoll.cs`, `BattleSim/Model/ModelHolder.cs` (two ranks shoot) |
| Abilities, spells, durations | strategic-phase | `BattleSim/Net/UnitInteractionStrategic.cs`, `Model/UnitEffects/UnitEffect.cs`, `Model/AbilityTargetMode.cs` |
| Rally and flight | strategic-phase | `BattleSim/Net/Unit.cs` (rally), `BattleSim/Phases/StrategicPhase.cs` (end-of-phase flight), `UnitScripts/UnitMovementFunctions.cs` |
| Who attacks, supporting attacks, lances | combat-phase | `BattleSim/Model/Formation.cs`, `BattleSim/Model/CombatRound.cs` |
| To hit and damage save tables | combat-phase | `Model/D6Roll.cs` |
| Commanders in combat | combat-phase | `BattleSim/Model/CombatRound.cs` (duels), `BattleSim/Net/Character.cs` |
| Fleeing after combat, surrounded | combat-phase | `BattleSim/Phases/CombatPhase.cs` |
| Army sizes, section limits, retinues | armies | `ArmyListBuilder/ArmyBuilder.cs`, `Model/ArmyList/ArmyList.cs` `IsListValid`, `Model/ArmyList/ArmyListSection.cs` |
| Option costs per model / per unit | armies | `Model/ArmyList/ArmyListRegiment.cs` `PointsCost`, `ArmyListEntry.cs` `PropertyCostUnit` |

## Game text the site corrects

`src/data/overrides.json` replaces game descriptions that were out of date. The game was fixed to the
same wording in Perwahl/FBS#115, and Web's range there was changed from 8 to 12 to match its text. Once
that is merged, the next export carries the new text, and these overrides can be removed:

- **Regeneration**: "Heals all missing wounds at end of turn."
- **Frenzy**, **Reanimated**, **Demonic**: add "Can't flee from charges." Reanimated and Demonic lose D3
  wounds instead of taking a break test.
- **Ambusher**: the zone stops 2" short of the centre line.
- **Halberd**: missing full stop.

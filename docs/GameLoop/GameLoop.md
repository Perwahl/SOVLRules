---
title: Game Loop
layout: default
has_children: true
color_scheme: dark
nav_order: 3
---

The SOVL game loop is divided into **Turns** and **Phases**. A turn starts with the [Charge Phase](ChargePhase) where players declare and resolve charges. It then continues with the [Strategic Phase](StrategicPhase) where units and heroes maneuver on the battlefield, fire ranged weapons, and use magical spells. Finally, in the [Combat Phase](CombatPhase), units and heroes fight in deadly melee combat. When all three phases are complete the turn ends and a new turn is started. At the end of the 8th turn (or if all units from one side are either destroyed or fleeing) the [game ends](EndOfGame)


## Alternating Activations
In the Charge- and Strategic Phase players take turns activating units and performing actions. The acting player chooses a unit to activate, performs all actions with it, and then hands over the initiative to the other player. Players alternate like this until all units have been activated, or until both players pass the phase. It can be helpful to have a physical token to hand over to keep track of the active player.

----

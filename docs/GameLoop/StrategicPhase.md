---
title: Strategic Phase
layout: default
parent: Game Loop
nav_order: 1
---

<link rel="stylesheet" href="../../style.css">

In the **Strategic Phase** players take turns activating their units and manoeuvre them on the battlefield. A unit can perform several actions like moving, using ranged attacks, or using other abilities like spells.

## Movement
All unit types have a movement allowance that determines how far they can move during one activation. See [Unit Types] for a full list. A unit can move on the battlefield in two ways; **Advancing** and **Pivoting**.

To make an **Advance**, move a unit straight forward. If it comes into contact with another unit or impassable terrain it stops. The movement cost of an **Advance** is equal to the number of inches moved. 

**Pivoting** is used to turn a unit to a new facing. To **Pivot**, rotate a unit up to 90° around it's center point. Each pivot has a movement cost 2 points of movement allowance.

When a unit is activated it can string togheter **Advances** and **Pivots** in any order, with a movement cost up to it's movement stat.

## Terrain
Some terrain features like Forests or Swamps are considered **Difficult Terrain**. Any unit starting it's activation in or entering **Difficult Terrain** lose 2 points of movement allowance. If a unit has less than 2 movement left, it can not enter **Difficult Terrain**!

## Ranged Attacks
If a unit has a ranged attack available it can use it once at any point during it's activation. To use a ranged attack first select a target that is within range and LoS, then roll a **Ranged Attack Roll**. The defending player rolls a **Defense Roll** against succesful hits and removes any casualties. 

A **Ranged Attact Roll** is performed by rolling a D6 for each model in the unit making a ranged attack. Any roll of 4+ is a succesful hit with the following modifiers:

:------|:-----
**Unit Skill**| Chance to hit increases by one for each point of Skill over 3 and decreases by one for each point of skill under 3. 
**Long Range**| Ranged Attacks have a maximum range, units outside of that range can't be targeted. Targets that are further away than *half the maximum range* are considered at **Long Range** and have a -1 penalty to be hit.


## Rally Fleeing Units
A fleeing unit that has not been activated this turn can be activated as normal, but can only perform one action; a Rally. To rally a unit, roll a **[Discipline Test]**. On a succesfull roll the unit rallies and is no longer considered fleeing.

At the end of the **Strategic Phase**, any unit still fleeing must make a **[Flight Move]** towards the nearest table edge. 

----

[Unit Types]: ../UnitTypes#Unit-Types
[Discipline Test]: ../UnitTypes#Discipline-and-Rank-Bonus
[Flight Move]: ../UnitTypes#Flight-Move

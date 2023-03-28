---
title: Combat Phase
layout: default
parent: Game Loop
nav_order: 2
---

<link rel="stylesheet" href="../../style.css">

In the **Combat Phase** units that have charged or remain in base contact from previous turns fight in deadly meelee combat. **Engagaments** are resolved one by one, casualties removed, and **Break Tests** are rolled to see if the losers stick around or turn tail and run.

## Resolve Engagements
Each grouping of two or more units in base contact is considered an **Engagement**.

**Engagements** are resolved one by one by taking the following steps:

1. All units in the engagement attack opponents in base contact. Attacks happen simultaneously. The attacking unit makes an **Attack Roll**, then the defending unit makes a **Damage Save** for each succesfull attack.
2. Remove casualties and calculate **Combat Score**
3. Roll **Break Tests** and move fleeing units.

## Attack Roll
Each model in an engaged flank can make an **Attack Roll**. The **Attacks** stat of the unit determines how many dice to roll.

Example: This unit of X is engaged in the front and is five models wide. X has 1 Attack on it's unit stats, so it rolls five d6 for it's **Attack Roll**

To determine if an **Attack Roll** is succesfull you compare the attackers and defenders **Skill** stat. 

|:-----|:-----|
|**Higher Skill**| If the attacking unit has higher **Skill**, a result of 3 or higher is succesfull.|
|**Equal or lower**| If the attacking unit has equal or lower **Skill**, a result of 4 or higher is succesfull.|

A model can only attack once per combat phase. If a unit is engaged in multiple sides, models will prioritize attacking to the front, and sides over rear.

## Supporting Attacks
If a unit is engaged in the front models in the second rank can make **Supporting Attacks**. Add only one **Attack Roll** per supporting model regardless of the units **Attack** stat. **Supporting Attacks** are never made to the sides or rear.

## Attacking Characters

## Damage Save
The defending player rolls a **Damage Save** for each succesfull attack. The defending unit suffers one wound for each failed save. 

To determine if a **Damage Save** is succesfull you compare the attackers **Power**  to the defenders **Defense**.

## Combat Score
When all units in an engagement has attacked you calculate the **Combat Score** for each player. The total combat score is made up of the following:

|:-----|:-----|
|**Wounds**| One point for each wound caused. |
|**Flank Bonus**| One Point for each unit engaging in the flank. |
|**Rear Bonus**| Two points for each unit engaged in the rear.|

While adding this up you can also remove all casualties from each unit.

## Break Tests
The side with the highest **Combat Score** wins, and all units on the loosing side rolls a **[Discipline Test]**.  
A succes is under or equal to the units **Discipline** plus **Rank Bonus**, minus the difference in combat score.

## Fleeing Units
Any unit that fails it's **Discipline Test** immediately makes a **[Flight Move]** move away from combat.


----

[Discipline Test]: ../UnitTypes#Discipline-and-Rank-Bonus
[Flight Move]: ../UnitTypes#Flight-Move

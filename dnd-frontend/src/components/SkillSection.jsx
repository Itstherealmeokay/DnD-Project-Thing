import { useState, useEffect } from 'react';

const SkillSection = ({ skills, ability, proficiencyBonus, expertiseBonus, skillProficiencies, skillExpertise, onToggleProficiency, onToggleExpertise, abilityScore }) => {

    //Assign Skills to their respective ability scores
    const filteredSkills = skills.filter(skill => skill.ability === ability);
    
    // Calculate ability modifier
    const abilityModifier = Math.floor((Number(abilityScore ?? 10) - 10) / 2);
  
    return (
        <div className="mb-3">
            <h3 className="text-sm font-semibold text-gray-600 mb-1 uppercase tracking-wide">{ability}</h3>
            <div className="space-y-1">
                {filteredSkills.map((skill) => {
                    const isProficient = skillProficiencies.includes(skill.id);
                    const isExpert = skillExpertise.includes(skill.id);
                    const skillModifier = abilityModifier + (isProficient ? proficiencyBonus : 0) + (isExpert ? proficiencyBonus : 0);
                    const modifierDisplay = skillModifier >= 0 ? `+${skillModifier}` : `${skillModifier}`;
                    
                    return (
                        <div key={skill.id} className="flex items-center gap-2 text-sm border border-gray-300 rounded p-2 bg-white">
                            <span className="text-gray-700 font-medium w-7 text-center">{modifierDisplay}</span>
                            <span className="text-gray-700 flex-1">{skill.name}</span>
                            <div className="flex items-center gap-3">
                                <label className="flex items-center gap-1 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={isProficient}
                                        onChange={() => onToggleProficiency(skill.id)}
                                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                    />
                                    <span className="text-xs text-gray-600">Prof</span>
                                </label>
                                <label className="flex items-center gap-1 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={isExpert && isProficient}
                                        onChange={() => onToggleExpertise(skill.id)}
                                        disabled={!isProficient}
                                        className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500 disabled:opacity-30 disabled:cursor-not-allowed"
                                    />
                                    <span className="text-xs text-gray-600">Exp</span>
                                </label>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default SkillSection;

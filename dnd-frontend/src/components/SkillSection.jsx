import { useState, useEffect } from 'react';

const SkillSection = ({ skills, ability, proficiencyBonus, expertiseBonus, skillProficiencies, skillExpertise, onToggleProficiency, onToggleExpertise, abilityScore }) => {

    //Assign Skills to their respective ability scores
    const filteredSkills = skills.filter(skill => skill.ability === ability);
    
    // Calculate ability modifier
    const abilityModifier = Math.floor((Number(abilityScore ?? 10) - 10) / 2);
  
    return (
        <div className="bg-white rounded-lg shadow-md p-4 mb-4">
            <h2 className="text-lg font-semibold text-gray-700 mb-3">{ability} Skills</h2>
            <div className="space-y-2">
                {filteredSkills.map((skill) => {
                    const isProficient = skillProficiencies.includes(skill.id);
                    const isExpert = skillExpertise.includes(skill.id);
                    const skillModifier = abilityModifier + (isProficient ? proficiencyBonus : 0) + (isExpert ? proficiencyBonus : 0);
                    const modifierDisplay = skillModifier >= 0 ? `+${skillModifier}` : `${skillModifier}`;
                    
                    return (
                        <div key={skill.id} className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-2">
                                <span className="text-gray-700 font-medium w-8 text-center">{modifierDisplay}</span>
                                <span className="text-gray-700">{skill.name}</span>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => onToggleProficiency(skill.id)}
                                    className={`px-3 py-1 rounded-md text-sm font-medium ${
                                        isProficient
                                            ? 'bg-blue-500 text-white'
                                            : 'bg-gray-200 text-gray-700'
                                    }`}
                                >
                                    {isProficient ? 'Proficient' : 'Not Proficient'}
                                </button>
                                <button
                                    onClick={() => onToggleExpertise(skill.id)}
                                    disabled={!isProficient}
                                    className={`px-3 py-1 rounded-md text-sm font-medium ${
                                        isExpert && isProficient
                                            ? 'bg-green-500 text-white'
                                            : isProficient
                                            ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                    }`}
                                >
                                    {isExpert && isProficient ? 'Expert' : 'Expertise'}
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default SkillSection;

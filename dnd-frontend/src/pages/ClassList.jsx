import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SubmitButton from '../components/SubmitButton';

const ClassList = () => {
    const navigate = useNavigate();
    const [classes, setClasses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchClasses();
    }, []);

    const fetchClasses = async () => {
        setLoading(true);
        setError('');

        try {
            const response = await axios.get('/api/classes');
            setClasses(response.data);
        } catch (fetchError) {
            console.error('Error fetching classes:', fetchError);
            setError('Unable to load classes right now. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    // Ready to be connected to your add-class flow.
    const handleCreateClass = () => {
        navigate('/classes/create');
    };

    if (loading) return <div className="text-center py-8">Loading classes...</div>;

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 py-8 px-4">
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                        Available Classes
                    </h1>
                    <SubmitButton type="button" onClick={handleCreateClass}>
                        Create Class
                    </SubmitButton>
                </div>

                {error && (
                    <div className="mb-6 p-4 rounded-lg border border-red-300 bg-red-100 text-red-800">
                        {error}
                    </div>
                )}

                {classes.length === 0 ? (
                    <div className="text-center bg-white rounded-lg shadow p-8">
                        <p className="text-gray-600 mb-4">No classes found in the database yet.</p>
                        <SubmitButton type="button" onClick={handleCreateClass}>
                            Add Your First Class
                        </SubmitButton>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {classes.map((classData) => (
                            <div key={classData._id} className="bg-white rounded-lg shadow-lg p-6">
                                <h2 className="text-2xl font-bold mb-2">{classData.name}</h2>
                                <p className="text-gray-700 mb-4">Hit Die: 1d{classData.hitDie ?? classData.hitdie}</p>

                                <div className="space-y-3 text-sm">
                                    <div>
                                        <h3 className="font-semibold text-gray-800">Armor Proficiencies</h3>
                                        <p className="text-gray-600">{classData.armorProficiencies?.join(', ') || 'None'}</p>
                                    </div>

                                    <div>
                                        <h3 className="font-semibold text-gray-800">Weapon Proficiencies</h3>
                                        <p className="text-gray-600">{classData.weaponProficiencies?.join(', ') || 'None'}</p>
                                    </div>

                                    <div>
                                        <h3 className="font-semibold text-gray-800">Saving Throws</h3>
                                        <p className="text-gray-600">{classData.savingThrows?.join(', ') || 'None'}</p>
                                    </div>

                                    <div>
                                        <h3 className="font-semibold text-gray-800">Skills</h3>
                                        <p className="text-gray-600">{classData.skills?.join(', ') || 'None'}</p>
                                    </div>

                                    <div>
                                        <h3 className="font-semibold text-gray-800">Class Features</h3>
                                        <p className="text-gray-600">{classData.classFeatures?.join(', ') || 'None'}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ClassList;

    
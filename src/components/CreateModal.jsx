import { useState } from 'react';

export default function CreateModal({ show, onClose, onSave, modalType }) {
    
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [priorityLevel, setPriority] = useState(1)
    const [dateLimit, setDate] = useState()
    const [resources, setResources] = useState('')

    const handleSave = () => {
        onSave({ title, desc, priorityLevel, dateLimit, resources });
        onClose(); 
    };

    if (!show) {
        return null;
    }

    return (
        <div >
            <div >
                <button onClick={onClose} >Close</button>
                <h3>Create New {modalType}</h3>
                <div>
                    <label>Title:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div>
                    <label>Description:</label>
                    <input
                        type="text"
                        value={desc}
                        onChange={(e) => setDesc (e.target.value)}
                    />
                </div>
            </div>
            {modalType == "task" ? 
            (
                <div>
                    <label >Priority:</label>
                    <select value={priorityLevel} onChange={e => setPriority(e.target.value)}>
                        <option value={1}>Low</option>
                        <option value={2}>Medium</option>
                        <option value={3}>High</option>
                    </select>
                    <label >Date Limit:</label>
                    <input type="date" value={dateLimit} onChange={e => setDate(e.target.value)}/>
                </div>
            ) : 
            //for notes
            (
                <div>
                    <label >Resources: </label>
                    <input type="url" value={resources} onChange={e => setResources(e.target.value)} />
                </div>
            )}
            <button onClick={handleSave}>Save {modalType}</button>
        </div>
    );
}

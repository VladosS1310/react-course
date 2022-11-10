import React, {useRef, useState} from 'react';
import './Board.css';


interface Props {
    name: string;
    id: string;
    onSubmitEditing: (id: string, name: string) => void;
}

export const BoardPreview = ({name, onSubmitEditing, id}: Props) => {
    const [editing, setEditing] = useState(false);
    const [newName, setNewName] = useState(name);
    const inputEl = useRef<HTMLInputElement>(null);

    const submitEditing = () => {
        onSubmitEditing(id, newName);
        setEditing(false);
    }

    const enableEditing = () => {
        setEditing(true);
        setTimeout(() => {
            inputEl.current!.focus();
        }, 0)
    }

    return (
        <div className="boardPreview" onDoubleClick={() => enableEditing()}>
            {editing ? (
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        submitEditing();
                    }}>
                        <input
                            type="text"
                            value={newName}
                            onChange={({target: {value}}) => setNewName(value)}
                            ref={inputEl}
                        />
                    </form>

                ) : (
                    newName
                )
            }
        </div>
    );
};

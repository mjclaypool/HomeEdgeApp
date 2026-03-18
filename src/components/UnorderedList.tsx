import EditNoteWindow from "./EditNoteWindow"

type unorderedListProps = {
    items?: string[],
    editing: boolean,
    onDone: () => void
}

export default function UnorderedList( props : unorderedListProps ) {
    const handleDone = () => {
        props.onDone()
    }

    return (
        <>
            {props.editing ?
                <ul className="text-[12px] list-disc pl-4">
                    {props.items?.map((item, index) => (
                        <li key={index}>
                            <EditNoteWindow index={index} item={item} onDone={handleDone} />
                        </li>
                    ))}
                </ul>
            :
                <ul className="text-[12px] list-disc pl-4">
                    {props.items?.map((item, index) => (
                        <li key={index}>
                            {item}
                        </li>
                    ))}
                </ul>
            }
        </>
    )
}
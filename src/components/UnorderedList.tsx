type unorderedListProps = {
    items?: string[],
}

export default function UnorderedList( props : unorderedListProps ) {
    return (
        <ul className="text-[12px] list-disc pl-4">
            {props.items?.map((item, index) => (
                <li key={index}>
                    {item}
                </li>
            ))}
        </ul>
    )
}
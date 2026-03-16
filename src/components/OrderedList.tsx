type orderedListProps = {
    steps?: string[],
}

export default function OrderedList( props : orderedListProps ) {
    return (
        <ol className='list-decimal text-[12px] pl-4'>
            {props.steps?.map((step, index) => (
                <li key={index}>
                    {step}
                </li>
            ))}
        </ol>
    )
}
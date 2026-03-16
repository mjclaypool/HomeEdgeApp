type subHeadingProps = {
    subHeading: string,
}

export default function TaskSubHeading( props : subHeadingProps ) {
    return (
        <div>
            <h2 className="text-[16px]">{props.subHeading}</h2>
        </div>
    )
}
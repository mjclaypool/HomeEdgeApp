type headingProps = {
    headingText: string,
}

export default function DashboardHeading( props : headingProps) {
    return (
        <div className="flex flex-col gap-[6px]">
            <h2 className="text-[16px] text-cc-offw font-bold">{props.headingText}</h2>
            <div className="w-full h-[2px] bg-cc-offw rounded-full" />
        </div>
    )
}
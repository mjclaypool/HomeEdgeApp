import { Link } from "react-router-dom"

interface TaskData {
  id: string,
  name: string,
  description: string,
  frequency: string,
  reminder: boolean,
  reminderEarly: boolean,
  nextReminder: string,
  nextReminderEarly: string,
  notes: string[],
  instructions: string[],
  references: string[]
}

type cardProps = {
    cardList: TaskData[] | undefined
}

export default function TaskCards( props : cardProps ) {
    return (
        <div className="flex flex-wrap justify-between gap-6 py-[12px]">
            {props.cardList && props.cardList.map(card => (
                <div key={card.id} className="w-[165px] h-[85px] bg-cc-offw rounded-lg text-cc-prim font-medium">
                    <Link to={card.id} className="flex flex-col justify-between w-full h-full p-[6px]">
                        <h3 className="text-[14px]">{card.name}</h3>
                        <div className="flex justify-between">
                            <h4 className="text-[12px]">{card.nextReminder}</h4>
                            <h4 className="text-[12px]">Every {card.frequency}</h4>
                        </div>
                    </Link>
                </div>
            ))}
        </div>
    )
}
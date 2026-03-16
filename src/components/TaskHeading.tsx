// Use context to get task name, description

import BackButton from "../UI/BackButton";

export default function TaskHeading() {
    return (
        <div>
            <BackButton />
            <h1 className="text-[24px]">Replace Air Filters</h1>
            <p className="text-[12px]">Inspect and replace the HVAC air filter to maintain good airflow and indoor air wuality.</p>
        </div>
    )
}
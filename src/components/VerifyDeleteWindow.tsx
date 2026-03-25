type windowProps = {
    onConfirm: () => void,
    onCancel: () => void
}

export default function VerifyDeleteWindow( props : windowProps ) {
    return (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center">
            <div className="flex items-center justify-center w-[402px] h-[874px] p-[24px] bg-cc-prim/80 rounded-[48px]">
                <div className="flex flex-col items-center max-w-[402px] text-center bg-cc-offw rounded-lg text-cc-prim p-3">
                    <h3 className="font-bold text-[18px]">Delete</h3>
                    <p className="text-[14px] py-3">Are you sure you would like to delete this task? This action cannot be undone.</p>
                    <div className="flex w-full justify-center gap-3">
                        <button
                            className="border-2 border-cc-prim rounded-lg py-1 w-full"
                            type="button"
                            onClick={props.onCancel}>
                                Cancel
                        </button>
                        <button
                            className="bg-cc-red border-2 border-cc-red text-cc-offw rounded-lg py-1 w-full"
                            type="button"
                            onClick={props.onConfirm}>
                                Confirm
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
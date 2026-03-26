import { Outlet } from 'react-router-dom';

export default function RootLayout() {
  return (
    <div className="flex items-center justify-center min-w-screen min-h-screen bg-gradient-to-b from-[#010d13] to-[#092533]">
        <div className="relative sm:w-[434px] sm:h-[906px] sm:bg-slate-300 sm:rounded-[60px] sm:p-2">
            <div className="relative sm:w-[418px] sm:h-[890px] sm:bg-black sm:rounded-[54px] sm:p-2">
                <div className="relative w-screen h-screen sm:w-[402px] sm:h-[874px] font-roboto bg-cc-prim sm:rounded-[48px] p-[24px] overflow-y-auto">
                    <main className="w-full h-full">
                        <Outlet />
                    </main>
                </div>
            </div>
        </div>
    </div>
  )
}
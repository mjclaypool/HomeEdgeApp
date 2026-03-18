import { Outlet } from 'react-router-dom';

export default function RootLayout() {
  return (
    <div className="flex items-center justify-center min-w-screen min-h-screen bg-gradient-to-b from-[#010d13] to-[#092533]">
        <div className="relative w-[434px] h-[906px] bg-slate-300 rounded-[60px] p-2">
            <div className="relative w-[418px] h-[890px] bg-black rounded-[54px] p-2">
                <div className="relative w-[402px] h-[874px] font-roboto bg-cc-prim rounded-[48px] p-[24px] overflow-y-auto">
                    <main className="w-full h-full">
                        <Outlet />
                    </main>
                </div>
            </div>
        </div>
    </div>
  )
}
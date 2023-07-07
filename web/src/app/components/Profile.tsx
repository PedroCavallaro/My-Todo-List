interface User{
    name?: string,
    picture?: string
}

export default function Profile(user: User) {
    return(
        <div className="flex items-center gap-3 text-right mr-5">
            <div>
                <p className="">{`Olá ${user.name}`}</p>
                <a className="text-red-400 cursor-pointer hover:text-red-600 transition-all"
                href="/api/auth/logout"
                >
                Sair
                </a>
            </div>
            <div className="flex w-14 h-14 items-center justify-center rounded-full bg-white border-1 border-black overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={user.picture!} width={900} height={900} alt="user Picture"/>
            </div>
        </div>
    )
};

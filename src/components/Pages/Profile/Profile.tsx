'use client'
import Image from "next/image"
import { useState } from "react"
import { signOut, useSession } from "next-auth/react"
import CustomButton from "../../Custom/CustomButton"
import { Button } from "@/components/shadcn/button"
import { toast } from "sonner"
import { handleUpdatePasswordAction, handleUpdateProfileAction } from "@/actions/user.action"


const Profile = ({ profile }: { profile: any }) => {
    const [myProfile, setMyProfile] = useState(profile)

    const [activeTab, setActiveTab] = useState("account-details")
    const [avatar, setAvatar] = useState<File | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const { data: session, update: sessionUpdate } = useSession()

    const handleUpdateProfile = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        const formData = new FormData()
        formData.append("user_name", myProfile?.user_name.trim() || '')
        formData.append("address", myProfile?.address.trim() || '')
        formData.append("phone", myProfile?.phone.trim() || '')
        if (avatar) {
            formData.append("avatar", avatar)
        }

        const res = await handleUpdateProfileAction(
            myProfile?.id,
            formData,
            session?.user?.accessToken as string
        )

        // console.log(res)

        if (!res.success) {
            toast.error(res.message)
            setIsLoading(false)
            return
        }

        // Cập nhật session nếu thành công
        sessionUpdate({
            user: {
                ...session?.user,
                user_name: res.data.user_name,
                avatar_url: res.data.avatar_url,
            },
        })

        toast.success("Profile updated successfully")
        setIsLoading(false)
    }

    const handleChangePassword = async () => {
        const res = await handleUpdatePasswordAction({
            oldPassword,
            newPassword,
            confirmPassword
        }, session?.user?.accessToken as string)
        if (!res.success) {
            toast.error(res.message)
            return
        }
        toast.success("Password updated successfully")
    }

    return (
        <section className="overflow-hidden py-20 bg-gray-100">
            <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
                <div className="flex flex-col xl:flex-row gap-7.5">
                    {/* <!--== user dashboard menu start ==--> */}
                    <div className="xl:max-w-[370px] w-full bg-white rounded-xl shadow-1">
                        <div className="flex xl:flex-col">
                            <div className="hidden lg:flex flex-wrap items-center gap-5 py-6 px-4 sm:px-7.5 xl:px-9 border-r xl:border-r-0 xl:border-b border-gray-3">
                                <div className="max-w-[64px] w-full h-16 rounded-full overflow-hidden">
                                    <img
                                        src={profile?.avatar_url}
                                        alt="user"
                                        width={64}
                                        height={64}
                                    />

                                </div>

                                <div>
                                    <p className="font-medium text-dark mb-0.5">
                                        {myProfile?.user_name || 'No name'}
                                    </p>
                                </div>
                            </div>

                            <div className="p-4 sm:p-7.5 xl:p-9">
                                <div className="flex flex-wrap xl:flex-nowrap xl:flex-col gap-4">

                                    <button onClick={() => setActiveTab("account-details")}
                                        className={`cursor-pointer flex items-center rounded-md gap-2.5 py-3 px-4.5 ease-out duration-200 hover:bg-blue-700 hover:text-white ${activeTab === "account-details"
                                            ? "text-white bg-blue-700"
                                            : "text-dark-2 bg-gray-1"
                                            }`}
                                    >
                                        <svg className="fill-current" width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg" >
                                            <path fillRule="evenodd" clipRule="evenodd" d="M10.9995 1.14581C8.59473 1.14581 6.64531 3.09524 6.64531 5.49998C6.64531 7.90472 8.59473 9.85415 10.9995 9.85415C13.4042 9.85415 15.3536 7.90472 15.3536 5.49998C15.3536 3.09524 13.4042 1.14581 10.9995 1.14581ZM8.02031 5.49998C8.02031 3.85463 9.35412 2.52081 10.9995 2.52081C12.6448 2.52081 13.9786 3.85463 13.9786 5.49998C13.9786 7.14533 12.6448 8.47915 10.9995 8.47915C9.35412 8.47915 8.02031 7.14533 8.02031 5.49998Z" fill="" />
                                            <path fillRule="evenodd" clipRule="evenodd" d="M10.9995 11.2291C8.87872 11.2291 6.92482 11.7112 5.47697 12.5256C4.05066 13.3279 2.97864 14.5439 2.97864 16.0416L2.97858 16.1351C2.97754 17.2001 2.97624 18.5368 4.14868 19.4916C4.7257 19.9614 5.53291 20.2956 6.6235 20.5163C7.71713 20.7377 9.14251 20.8541 10.9995 20.8541C12.8564 20.8541 14.2818 20.7377 15.3754 20.5163C16.466 20.2956 17.2732 19.9614 17.8503 19.4916C19.0227 18.5368 19.0214 17.2001 19.0204 16.1351L19.0203 16.0416C19.0203 14.5439 17.9483 13.3279 16.522 12.5256C15.0741 11.7112 13.1202 11.2291 10.9995 11.2291ZM4.35364 16.0416C4.35364 15.2612 4.92324 14.4147 6.15108 13.724C7.35737 13.0455 9.07014 12.6041 10.9995 12.6041C12.9288 12.6041 14.6416 13.0455 15.8479 13.724C17.0757 14.4147 17.6453 15.2612 17.6453 16.0416C17.6453 17.2405 17.6084 17.9153 16.982 18.4254C16.6424 18.702 16.0746 18.9719 15.1027 19.1686C14.1338 19.3648 12.8092 19.4791 10.9995 19.4791C9.18977 19.4791 7.86515 19.3648 6.89628 19.1686C5.92437 18.9719 5.35658 18.702 5.01693 18.4254C4.39059 17.9153 4.35364 17.2405 4.35364 16.0416Z" fill="" />
                                        </svg>
                                        Account Details
                                    </button>


                                    <button onClick={() => signOut({ callbackUrl: '/login', redirect: true })}

                                        className={`cursor-pointer flex items-center rounded-md gap-2.5 py-3 px-4.5 ease-out duration-200 hover:bg-blue-700 hover:text-white ${activeTab === "logout"
                                            ? "text-white bg-blue-700"
                                            : "text-dark-2 bg-gray-1"
                                            }`}
                                    >
                                        <svg className="fill-current" width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg" >
                                            <path d="M13.7005 1.14581C12.4469 1.14579 11.4365 1.14578 10.6417 1.25263C9.81664 1.36356 9.12193 1.60088 8.57017 2.15263C8.08898 2.63382 7.84585 3.22514 7.71822 3.91997C7.59419 4.59515 7.57047 5.42142 7.56495 6.41282C7.56284 6.79251 7.86892 7.10202 8.24861 7.10414C8.6283 7.10625 8.93782 6.80016 8.93993 6.42047C8.94551 5.4181 8.97154 4.70761 9.07059 4.16838C9.16603 3.64881 9.31927 3.34807 9.54244 3.12491C9.79614 2.87121 10.1523 2.7058 10.825 2.61537C11.5174 2.52227 12.435 2.52081 13.7508 2.52081H14.6675C15.9833 2.52081 16.901 2.52227 17.5934 2.61537C18.266 2.7058 18.6222 2.87121 18.8759 3.12491C19.1296 3.37861 19.295 3.7348 19.3855 4.40742C19.4786 5.09983 19.48 6.01752 19.48 7.33331V14.6666C19.48 15.9824 19.4786 16.9001 19.3855 17.5925C19.295 18.2652 19.1296 18.6214 18.8759 18.8751C18.6222 19.1288 18.266 19.2942 17.5934 19.3846C16.901 19.4777 15.9833 19.4791 14.6675 19.4791H13.7508C12.435 19.4791 11.5174 19.4777 10.825 19.3846C10.1523 19.2942 9.79614 19.1288 9.54244 18.8751C9.31927 18.6519 9.16603 18.3512 9.07059 17.8316C8.97154 17.2924 8.94551 16.5819 8.93993 15.5795C8.93782 15.1998 8.6283 14.8937 8.24861 14.8958C7.86892 14.8979 7.56284 15.2075 7.56495 15.5871C7.57047 16.5785 7.59419 17.4048 7.71822 18.08C7.84585 18.7748 8.08898 19.3661 8.57017 19.8473C9.12193 20.3991 9.81664 20.6364 10.6417 20.7473C11.4365 20.8542 12.4469 20.8542 13.7006 20.8541H14.7178C15.9714 20.8542 16.9819 20.8542 17.7766 20.7473C18.6017 20.6364 19.2964 20.3991 19.8482 19.8473C20.4 19.2956 20.6373 18.6009 20.7482 17.7758C20.855 16.981 20.855 15.9706 20.855 14.7169V7.28302C20.855 6.02939 20.855 5.01893 20.7482 4.22421C20.6373 3.39911 20.4 2.70439 19.8482 2.15263C19.2964 1.60088 18.6017 1.36356 17.7766 1.25263C16.9819 1.14578 15.9714 1.14579 14.7178 1.14581H13.7005Z" fill="" />
                                            <path d="M13.7507 10.3125C14.1303 10.3125 14.4382 10.6203 14.4382 11C14.4382 11.3797 14.1303 11.6875 13.7507 11.6875H3.69247L5.48974 13.228C5.77802 13.4751 5.81141 13.9091 5.56431 14.1974C5.3172 14.4857 4.88318 14.5191 4.5949 14.272L1.38657 11.522C1.23418 11.3914 1.14648 11.2007 1.14648 11C1.14648 10.7993 1.23418 10.6086 1.38657 10.478L4.5949 7.72799C4.88318 7.48089 5.3172 7.51428 5.56431 7.80256C5.81141 8.09085 5.77802 8.52487 5.48974 8.77197L3.69247 10.3125H13.7507Z" fill="" />
                                        </svg>
                                        Logout
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={`xl:max-w-[770px] w-full `} >
                        <form>
                            <div className="bg-white shadow-1 rounded-xl p-4 sm:p-8.5">
                                <div className="flex flex-col lg:flex-row gap-5 sm:gap-8 mb-5">
                                    <div className="w-full">
                                        <div className="max-w-[100px] mb-2 mx-auto h-[100px] bg-gray-200 rounded-md overflow-hidden">
                                            <img
                                                src={avatar ? URL.createObjectURL(avatar) : myProfile?.avatar_url || "https://placehold.jp/150x150.png"}
                                                alt="Avatar image"
                                                width={100}
                                                height={100}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        {/* <div className="w-[100px] h-[100px] mb-2 bg-gray-200 rounded-md" /> */}

                                        <div className="flex justify-center">
                                            <Button type="button"
                                            variant="outline"
                                            onClick={() =>
                                                document.getElementById("picture-input")?.click()
                                            }
                                            className="mb-5 mx-auto text-sm w-[100px] cursor-pointer"
                                        >
                                            {avatar ? "Change Avatar" : "Select Avatar"}
                                        </Button>
                                        </div>
                                        <input
                                            id="picture-input"
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            onChange={(e) => {
                                                if (e.target.files && e.target.files[0]) {
                                                    setAvatar(e.target.files[0])
                                                }
                                            }}
                                        />
                                        <label htmlFor="username" className="block mb-2.5">
                                            Username
                                        </label>

                                        <input
                                            type="text"
                                            name="username"
                                            placeholder="User Name"
                                            value={myProfile?.user_name}
                                            onChange={(e) => {
                                                setMyProfile({ ...myProfile, user_name: e.target.value })
                                            }}
                                            className="rounded-md border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-2.5 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
                                        />
                                    </div>


                                </div>

                                <div className="mb-5">
                                    <label htmlFor="address" className="block mb-2.5">
                                        Address
                                    </label>
                                    <input
                                        type="text"
                                        name="address"
                                        id="address"
                                        placeholder="Address"
                                        value={myProfile?.address}
                                        onChange={(e) => {
                                            setMyProfile({ ...myProfile, address: e.target.value })
                                        }}
                                        className="rounded-md border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-2.5 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
                                    />

                                </div>

                                <div className="mb-5">
                                    <label htmlFor="phone" className="block mb-2.5">
                                        Phone
                                    </label>
                                    <input
                                        type="text"
                                        name="phone"
                                        id="phone"
                                        placeholder="Phone"
                                        value={myProfile?.phone}
                                        onChange={(e) => {
                                            setMyProfile({ ...myProfile, phone: e.target.value })
                                        }}
                                        className="rounded-md border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-2.5 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
                                    />

                                </div>

                                <CustomButton isLoading={isLoading} color="blue" onClick={(e) => handleUpdateProfile(e)}>
                                    Save Changes
                                </CustomButton>
                            </div>

                            <p className="text-custom-sm mt-5 mb-9">
                                This will be how your name will be displayed in the account
                                section and in reviews
                            </p>

                            <p className="font-medium text-xl sm:text-2xl text-dark mb-7">
                                Password Change
                            </p>

                            <div className="bg-white shadow-1 rounded-xl p-4 sm:p-8.5">
                                <div className="mb-5">
                                    <label htmlFor="oldPassword" className="block mb-2.5">
                                        Old Password
                                    </label>

                                    <input value={oldPassword}
                                        onChange={(e) => setOldPassword(e.target.value)}
                                        type="password"
                                        className="rounded-md border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-2.5 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
                                    />
                                </div>

                                <div className="mb-5">
                                    <label htmlFor="newPassword" className="block mb-2.5">
                                        New Password
                                    </label>

                                    <input
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        type="password"
                                        className="rounded-md border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-2.5 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
                                    />
                                </div>

                                <div className="mb-5">
                                    <label
                                        htmlFor="confirmNewPassword"
                                        className="block mb-2.5"
                                    >
                                        Confirm New Password
                                    </label>

                                    <input
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        type="password"
                                        className="rounded-md border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-2.5 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
                                    />
                                </div>

                                <CustomButton color="blue" onClick={handleChangePassword}>
                                    Change Password
                                </CustomButton>
                            </div>
                        </form>
                    </div>
                    {/* <!-- details tab content end -->
          <!--== user dashboard content end ==--> */}
                </div>
            </div>
        </section>
    )
}

export default Profile
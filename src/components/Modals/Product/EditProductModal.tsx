import { Eye, Pencil } from "lucide-react";

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "../../ui/button";
import Image from "next/image";
import { useState } from "react";
import { Select, SelectValue, SelectTrigger, SelectContent, SelectItem } from "../../ui/select";
import PreviewProductModal from "@/components/Shop/PreviewProductModal";

const EditProductModal = ({ product }: { product: any }) => {
    return (
        <Dialog >
            <DialogTrigger>
                <Button variant="outline" className=" text-orange-500" >
                    <Pencil className="w-4 h-4" />
                    Edit
                </Button>
            </DialogTrigger>
            <DialogContent className={`lg:max-w-[1000px] overflow-y-scroll max-h-screen [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-white [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-white [&::-webkit-scrollbar-track]:my-5 [&::-webkit-scrollbar-thumb]:w-2 `}>
                <DialogHeader>
                    <DialogTitle>Edit Product Details</DialogTitle>
                    <DialogDescription>
                        Edit product details here.
                    </DialogDescription>
                </DialogHeader>
                {/* <EditProductModalContent product={product}></EditProductModalContent> */}
                <PreviewProductModal product={product}></PreviewProductModal>

                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button type="submit">Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
// const EditProductModalContent = ({ product }: { product: any }) => {
//     const [productData, setProductData] = useState(product);
//     const [avatar, setAvatar] = useState<any>(null);
//     console.log(avatar)
//     return (

//         <div className="grid gap-4">
//             <div className="grid gap-3 mx-auto items-center">
//                 <Label className="text-center">Avatar</Label>

//                 {/* Nếu có avatar mới được chọn thì preview ảnh mới */}
//                 {avatar ? (
//                     <Image
//                         src={URL.createObjectURL(avatar)}
//                         alt="New Avatar Preview"
//                         width={100}
//                         height={100}
//                         className="rounded-full mx-auto"
//                     />
//                 ) :
//                     userData.avatar_url ? (
//                         <Image
//                             src={userData.avatar_url}
//                             alt="Current Avatar"
//                             width={100}
//                             height={100}
//                             className="rounded-full mx-auto"
//                         />
//                     ) : (
//                         <div className="w-[100px] h-[100px] bg-gray-200 rounded-full mx-auto" />
//                     )}

//                 {/* Nút đổi ảnh hoặc chọn ảnh */}
//                 <Button
//                     type="button"
//                     variant="outline"
//                     onClick={() => document.getElementById('picture-input')?.click()}
//                     className="w-fit mx-auto"
//                 >
//                     {userData.avatar_ ? "Đổi ảnh" : "Chọn ảnh"}
//                 </Button>
//                 <input
//                     id="picture-input"
//                     type="file"
//                     accept="image/*"
//                     className="hidden"
//                     onChange={(e) => {
//                         if (e.target.files && e.target.files[0]) {
//                             setAvatar(e.target.files[0]);
//                         }
//                     }}
//                 />
//             </div>


//             <div className="grid gap-3">
//                 <Label>Username</Label>
//                 <Input defaultValue="User Name" value={userData.user_name}
//                     onChange={(e) => setUserData({ ...userData, user_name: e.target.value })}
//                 />
//             </div>

//             <div className="grid gap-3">
//                 <Label>Email</Label>
//                 <Input defaultValue="User Email" value={userData.email}
//                     onChange={(e) => setUserData({ ...userData, email: e.target.value })}
//                 />
//             </div>
//             <div className="grid gap-3">
//                 <Label>Phone</Label>
//                 <Input defaultValue="User Phone" value={userData.phone}
//                     onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
//                 />
//             </div>
//             <div className="grid gap-3">
//                 <Label>Address</Label>
//                 <Input defaultValue="User Address" value={userData.address}
//                     onChange={(e) => setUserData({ ...userData, address: e.target.value })}
//                 />
//             </div>
//             <div className="grid gap-3">
//                 <Label>Role</Label>

//                 <Select defaultValue={userData.role}
//                     onValueChange={(value) => setUserData({ ...userData, role: value })}
//                 >
//                     <SelectTrigger>
//                         <SelectValue placeholder="Select a role" />
//                     </SelectTrigger>
//                     <SelectContent>
//                         <SelectItem value="Admin">Admin</SelectItem>
//                         <SelectItem value="User">User</SelectItem>
//                     </SelectContent>
//                 </Select>
//             </div>

//         </div >

//     )
// }

export default EditProductModal;
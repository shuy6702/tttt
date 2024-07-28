import { View, StyleSheet, Text ,Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MyInput from "@/components/TextInput";
import { useState } from "react";
import { FIREBASE_APP } from "@/config";
import { getFirestore, setDoc, doc } from "firebase/firestore"
import { getStorage, ref, uploadBytes, getDownloadURL, UploadResult  } from "firebase/storage"
import PickerImage from "@/components/PickerImage";

const HomeScreen = () => {
    const [tenHang, setTenHang] = useState<string>("")
    const [mahang, setMaHang] = useState<string>("")
    const [dongia, setDongia] = useState<string>("")
    const [soluong, setSoLuong] = useState<string>("")
    const [ghichu, setGhichu] = useState<string>("")
    const [mota, setMoTa] = useState<string>("")
    const [image, setImage] = useState<string>("")



    const handleOK = async() => {
        if(!tenHang || !mahang || !dongia) {
            // validate
            return;
        }

        const newProduct = doc(getFirestore(FIREBASE_APP), "product", "123")

        try {
            await setDoc(newProduct, {
                tenHang,
                mahang,
                dongia,
                soluong,
                ghichu,
                anh: image,
                mota
            })
            alert("lưu thành công")
        } catch (error) {
            console.log(error)
        }
    }
    async function uploadImage(file: File) {
        const storage = getStorage(FIREBASE_APP);
        const storageRef = ref(storage, `images/${file.name}`);
        await uploadBytes(storageRef, file);
        const fileUrl = await getDownloadURL(storageRef);
        return fileUrl;
      }




    

    return (
        // giao diện ở đây là các thẻ
        <SafeAreaView>
            <View style={styles.container}>
            <MyInput label="Mã Hàng" placeholder="Nhập Mã Hàng" callback={(changeInput) => setMaHang(changeInput)} value={mahang} />
            <MyInput label="Tên Hàng" placeholder="Nhập Tên Hàng" callback={(changeInput) => setTenHang(changeInput)} value={tenHang} />
            <MyInput label="Đơn giá" placeholder="Nhập Đơn giá" callback={(changeInput) => setDongia(changeInput)} value={dongia} />
            <MyInput label="Số Lượng" placeholder="Nhập Số Lượng" callback={(changeInput) => setSoLuong(changeInput)} value={soluong} />
            <MyInput label="Ghi Chú" placeholder="Nhập Ghi Chú" callback={(changeInput) => setGhichu(changeInput)} value={ghichu} />
            {/* <MyInput label="ảnh" placeholder="Nhập ảnh" callback={(changeInput) => setAnh(changeInput)} value={anh} /> */}
            <PickerImage image={image} callback={setImage} uploadImage={uploadImage}  />
            <MyInput label="Mô tả" placeholder="Nhập Mô tả" callback={(changeInput) => setMoTa(changeInput)} value={mota} />

            <Button title="OK" onPress={() => handleOK()} /> 
        </View> 
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 40,
        paddingHorizontal: 20,
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 20
    },
})


export default HomeScreen;

// màn hình hiển thị sản phẩm
// tạo ra 1 component dùng chung
// comfirm ( cancle hoặc ok)

import { View, Text, StyleSheet } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { FIREBASE_APP } from "@/config"
import { getFirestore, getDocs, doc, collection, DocumentData, deleteDoc } from "firebase/firestore"
import { useEffect, useState } from "react"
import ProductItem from "@/components/ProductItem"
import { PaperProvider } from "react-native-paper"
import Alert from "@/components/Alert"
import { useContext } from "react"
import { MyContext } from "@/context/Mycontext";
import { router } from "expo-router"
;

type productProps = {
    id: string,
    tenHang: string,
    mahang: string,
    dongia: string,
    soluong: string,
    ghichu: string,
    anh: string,
    mota: string
}



const ProductScreen = () => {

    const [products, setProducts] = useState<DocumentData | []>([])

    const {  showAlert,
        selectedId,
        setShowAlert,
        setSelectedId } = useContext<{
            showAlert: boolean,
            selectedId: string,
            setShowAlert?: React.Dispatch<React.SetStateAction<boolean>>,
            setSelectedId?:React.Dispatch<React.SetStateAction<string>>
        }>(MyContext)



    const handleConfirmOk = async () => {

        try {
            await deleteDoc(doc(getFirestore(FIREBASE_APP), "product", selectedId));
            setShowAlert && setShowAlert(false);
            alert("xóa thành công!");
            router.replace({
                pathname: "/product"
            })
        } catch (error) {
            alert(error);
        }
    }
    


    const handleConfirmCancle = () => {

    }

    const handleForwardId = (id: string) => {
        setShowAlert && setShowAlert(true);
        setSelectedId && setSelectedId(id)
    }

    useEffect(() => {
        ; (async () => {
            let data: DocumentData = [];
            const querySnapshot = await getDocs(collection(getFirestore(FIREBASE_APP), "product"));
            querySnapshot.forEach((doc) => {
                const docId = doc.id;
                const infoDoc = doc.data()
                data.push({ id: docId, ...infoDoc })
            });

            console.log("data product", data);
            data.length > 0 && setProducts(data)
        })()
    }, [])

    return (
        <PaperProvider>
            <SafeAreaView>

                <View style={style.container}>
                    {products.length > 0 && products.map((product: productProps, _: any) => {
                        const { id, mahang, tenHang, soluong, anh } = product
                        return <ProductItem key={id} id={id} mahang={mahang} tenHang={tenHang} soluong={soluong} anh={anh} cb={() => handleForwardId(id)} />
                    })}
                </View>


            </SafeAreaView>
            <Alert show={showAlert} content={"Chắc chắn xóa"} cbCancle={handleConfirmCancle} cbOk={handleConfirmOk} />
        </PaperProvider>
    )
}

const style = StyleSheet.create({
    container: {
        width: "100%",
        paddingHorizontal: 15,
        height: "auto",
        display: "flex",
        gap: 20
    }
})

export default ProductScreen;
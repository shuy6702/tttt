
import { View, Text, Image, Button } from "react-native";
import { doc, deleteDoc, getFirestore } from "firebase/firestore";
import { FIREBASE_APP } from "@/config";

type productItemProps = {
    id: string,
    tenHang: string,
    mahang: string,
    dongia?: string,
    soluong: string,
    ghichu?: string,
    anh: string,
    mota?: string,
    cb: () => void;
}

const ProductItem = (props: productItemProps) => {


    return (
        <View style={{
            width: "100%",
            height: 80,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
        }}>
            <View style={{
                height: "100%",
                display: 'flex',
                flexDirection: "column",
                gap: 20
            }}>

                <View style={{
                    width: 80,
                    height: 80,

                }}>
                    <Image
                        style={{
                            width: "100%",
                            height: "100%"
                        }}
                        source={{
                            uri: props.anh
                        }}

                    />
                    <Text>{props.mahang}</Text>
                    <Text>{props.tenHang}</Text>
                    <Text>{props.soluong}</Text>
                </View>

                <View style={{
                    height: "100%",
                    flex: 1,
                    display: "flex",
                    gap: 8
                }}>
                    
                </View>
            </View>
            <Button title="xóa" onPress={() => props.cb()} />
        </View>
    )
}

export default ProductItem
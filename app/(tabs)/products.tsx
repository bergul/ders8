import { useState, useEffect } from 'react';

import { StyleSheet, Text, View, FlatList, Image } from 'react-native';
import axios from 'axios';
import { useSearchParams } from 'expo-router/build/hooks';


const Products = () => {
    const [products, setProducts] = useState([]);
    const searchParams = useSearchParams();
    const category = searchParams.get('category');

    useEffect(() => {
        if (category) {
            axios.get(`https://dummyjson.com/products/category/${category}`)
                .then(response => {
                    setProducts(response.data.products);
                })
                .catch(error => {
                    console.error(error);
                });
        }
    }, [category]);

    return (
        <View style={styles.container}>
            <FlatList
                data={products}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <Image source={{ uri: item.thumbnail }} style={styles.image} />
                        <View style={styles.info}>
                            <Text style={styles.title}>{item.title}</Text>
                            <Text style={styles.price}>${item.price}</Text>
                        </View>
                    </View>
                )}
            />
        </View>
    );
}

export default Products;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    item: {
        flexDirection: 'row',
        marginBottom: 16,
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    image: {
        width: 50,
        height: 50,
        marginRight: 16,
    },
    info: {
        flex: 1,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    price: {
        fontSize: 14,
        color: '#888',
    },
});
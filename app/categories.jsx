// app/categories.jsx
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity,
  Image 
} from 'react-native';
import { router } from 'expo-router';

const categories = [
  { 
    id: '1', 
    name: 'Concrete Girders', 
    image: require('../assets/images/Slab.png'),
    description: 'Comfortable and efficient daily drivers',
    count: '24 vehicles'
  },
  { 
    id: '2', 
    name: 'Concrete Slabs', 
    image: require('../assets/images/Girder.png'),
    description: 'Spacious family vehicles with versatility',
    count: '18 vehicles'
  },
  { 
    id: '3', 
    name: 'Boundary Wall Columns', 
    image: require('../assets/images/bw-column.jpg'),
    description: 'Powerful workhorses for any job',
    count: '12 vehicles'
  },
  { 
    id: '4', 
    name: 'Boundary Wall', 
    image:  require('../assets/images/boundary-wall.jpg'),
    description: 'Premium vehicles with exceptional comfort',
    count: '15 vehicles'
  },
];

export default function Categories() {
  const renderCategory = ({ item }) => (
    <TouchableOpacity
      style={styles.categoryCard}
      onPress={() => router.push({
        pathname: '/products',
        params: { categoryName: item.name, categoryId: item.id }
      })}
    >
      <View style={styles.cardContent}>
        <View style={styles.imageContainer}>
          <Image
            source={typeof item.image === 'string' 
              ? { uri: item.image }
              : item.image}
            style={styles.categoryImage}
            resizeMode="cover"
          />
        </View>
        
        <View style={styles.textContent}>
          <View style={styles.headerRow}>
            <Text style={styles.categoryName}>{item.name}</Text>
            <Text style={styles.count}>{item.count}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={categories}
        renderItem={renderCategory}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F6FA',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2C3E50',
    padding: 16,
    paddingBottom: 8,
  },
  listContainer: {
    padding: 16,
  },
  categoryCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
    overflow: 'hidden',
  },
  cardContent: {
    flexDirection: 'column',
  },
  imageContainer: {
    width: '100%',
    height: 200,
    backgroundColor: '#F8F9FA',
  },
  categoryImage: {
    width: '100%',
    height: '100%',
  },
  textContent: {
    padding: 16,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  description: {
    fontSize: 14,
    color: '#7F8C8D',
    lineHeight: 20,
  },
  count: {
    fontSize: 12,
    color: '#95A5A6',
    backgroundColor: '#F8F9FA',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
    overflow: 'hidden',
  },
});
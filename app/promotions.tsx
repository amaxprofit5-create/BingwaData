import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Animated,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

/* ---------- Theme Types ---------- */
interface Theme {
  globalHeaderBackground: string;
  globalHeaderText: string;
  containerBackground: string;
  textColor: string;
  packageItemBackground: string;
}

/* ---------- Promotions Data Type ---------- */
interface Promotion {
  id: string;
  title: string;
  description: string;
  discount: string;
  validUntil: string;
  icon: string;
}

/* ---------- Mock Promotions Data ---------- */
const promotionsData: Promotion[] = [
  {
    id: 'p1',
    title: 'Double Data Weekend',
    description: 'Get 2x data on all bundles this weekend',
    discount: '2x Data',
    validUntil: 'Until Sunday',
    icon: 'infinite',
  },
  {
    id: 'p2',
    title: 'Free Minutes Bonus',
    description: 'Purchase 50 minutes and get 25 free',
    discount: '+25 Free',
    validUntil: 'Until end of month',
    icon: 'call',
  },
  {
    id: 'p3',
    title: 'SMS Mega Pack',
    description: 'Get 500 SMS for the price of 200',
    discount: '150% Bonus',
    validUntil: 'Today only',
    icon: 'mail',
  },
  {
    id: 'p4',
    title: 'Loyalty Reward',
    description: 'Top-up 5 times and get KES 50 credit',
    discount: 'KES 50',
    validUntil: 'Next 7 days',
    icon: 'star',
  },
  {
    id: 'p5',
    title: 'New User Offer',
    description: 'First purchase gets 30% discount',
    discount: '-30%',
    validUntil: 'First purchase only',
    icon: 'gift',
  },
  {
    id: 'p6',
    title: 'Refer & Earn',
    description: 'Refer a friend and both get KES 100',
    discount: 'KES 100',
    validUntil: 'Ongoing',
    icon: 'people',
  },
];

/* ---------- Promotions Screen Component ---------- */
interface PromotionsScreenProps {
  theme: Theme;
}

export default function PromotionsScreen({ theme }: PromotionsScreenProps) {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const renderPromotionItem = ({ item }: { item: Promotion }) => (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[styles.promotionCard, { backgroundColor: theme.packageItemBackground }]}
    >
      <View style={styles.promotionHeader}>
        <View style={styles.iconContainer}>
          <Ionicons name={item.icon as any} size={24} color="#2E7D32" />
        </View>
        <View style={styles.promotionTitleSection}>
          <Text
            style={[styles.promotionTitle, { color: theme.textColor }]}
            numberOfLines={2}
          >
            {item.title}
          </Text>
          <Text style={[styles.promotionDescription, { color: theme.textColor }]}>
            {item.description}
          </Text>
        </View>
      </View>

      <View style={styles.promotionFooter}>
        <View style={styles.discountBadge}>
          <Text style={styles.discountText}>{item.discount}</Text>
        </View>
        <Text style={[styles.validUntil, { color: theme.textColor }]}>
          {item.validUntil}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <Animated.View style={[{ opacity: fadeAnim }, { flex: 1 }]}>
      <SafeAreaView
        style={[styles.container, { backgroundColor: theme.containerBackground }]}
      >
        <Text style={[styles.screenHeader, { color: theme.textColor }]}>
          Promotions & Offers
        </Text>
        {promotionsData.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={{ color: theme.textColor, textAlign: 'center', fontSize: 16 }}>
              No active promotions at the moment.
            </Text>
          </View>
        ) : (
          <FlatList
            data={promotionsData}
            keyExtractor={(item) => item.id}
            renderItem={renderPromotionItem}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContent}
          />
        )}
      </SafeAreaView>
    </Animated.View>
  );
}

/* ---------- Styles ---------- */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  screenHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  listContent: {
    paddingBottom: 20,
  },
  promotionCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  promotionHeader: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#E8F5E9',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  promotionTitleSection: {
    flex: 1,
    justifyContent: 'center',
  },
  promotionTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  promotionDescription: {
    fontSize: 13,
    opacity: 0.7,
  },
  promotionFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.05)',
  },
  discountBadge: {
    backgroundColor: '#D4EDDA',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
  },
  discountText: {
    color: '#2E7D32',
    fontWeight: 'bold',
    fontSize: 12,
  },
  validUntil: {
    fontSize: 12,
    fontStyle: 'italic',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

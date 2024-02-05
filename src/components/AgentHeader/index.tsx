import { Image, Text, View } from 'react-native';
import React from 'react';
import { useColors } from '../../hooks/colors';
import styles from './styles';
interface Props {
  isActive: boolean;
  firstName: string;
  secondName: string;
  role: string;
  photo?: string;
}

const AgentHeader = ({ isActive, firstName, secondName, role }: Props) => {
  const { colors } = useColors();
  return (
    <View
      key={'header'}
      style={[
        styles.container,
        // {
        //   borderColor: colors.grey,
        // },
      ]}
    >
      <View style={styles.content}>
        <View>
          <Image
            source={require('../../assets/placeholder.jpg')}
            style={styles.image}
          />
          {isActive && (
            <View
              style={[
                styles.status,
                styles.activeStatusColor,
                // {
                //   borderColor: colors.bg,
                // },
              ]}
            />
          )}
        </View>
        <View key={'info'} style={styles.info}>
          <Text
            style={[
              styles.nameText,
              // { color: colors.greyPrimary }
            ]}
          >
            {firstName + ' ' + secondName}
          </Text>
          <Text
            style={[
              styles.roleText,
              { color: colors.incomingMessageSecondaryTextColor },
            ]}
          >
            {role}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default AgentHeader;

import {View} from 'react-native';

const Spacer = ({w, h, style, prop}) => {
  return <View style={[{width: w, height: h}, {...style}]} {...prop} />;
};

export default Spacer;

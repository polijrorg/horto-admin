import styled from 'styled-components/native';

export const Overlay = styled.View`
    flex: 1;
    background-color: rgba(0, 0, 0, 0.4);
    justify-content: center;
    align-items: center;
`;

export const Container = styled.View`
    width: 90%;
    background-color: white;
    padding: 24px;
    border-radius: 10px;
    elevation: 5;
`;

export const Title = styled.Text`
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 20px;
    text-align: center;
`;

export const Label = styled.Text`
    font-size: 14px;
    margin-top: 12px;
    margin-bottom: 4px;
`;

export const StyledInput = styled.TextInput`
    border: 1px solid #ccc;
    border-radius: 6px;
    padding: 10px;
    font-size: 16px;
`;

export const Button = styled.TouchableOpacity`
    background-color: #006adc;
    padding: 12px;
    border-radius: 6px;
    margin-top: 20px;
    align-items: center;
`;

export const ButtonText = styled.Text`
    color: white;
    font-weight: bold;
    font-size: 16px;
`;

export const CancelText = styled.Text`
    color: #888;
    text-align: center;
    margin-top: 12px;
    font-size: 14px;
`;

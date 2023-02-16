import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    greeting: {
        marginTop: 32,
        fontSize: 18,
        fontWeight: '400',
        textAlign: 'center',
    },
    errorMessage: {
        height: 72,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 30,
    },
    error: {
        color: '#E9446A',
        fontSize: 13,
        fontWeight: '600',
        textAlign: 'center',
    },
    form: {
        marginBottom: 48,
        marginHorizontal: 30,
    },
    inputTitle: {
        color: '#8A8F9E',
        fontSize: 10,
        textTransform: 'uppercase',
    },
    input: {
        borderBottomColor: '#8A8F9E',
        borderBottomWidth: StyleSheet.hairlineWidth,
        height: 40,
        width: 300,
        fontSize: 15,
        color: '#161F3D',
    },
    button: {
        marginHorizontal: 30,
        backgroundColor: '#E9446A',
        borderRadius: 4,
        height: 52,
        alignItems: 'center',
        justifyContent: 'center',
        padding:10
    },
    buttonTitle: {
        color: '#FFF',
        fontSize: 20,
        fontWeight: 'bold',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    verticalWrapper: {
        flex: 1,
        paddingVertical: 280,
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    horizontalWrapper: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000',
    },
    listItemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        margin: 2,
        borderColor: '#2a4944',
        borderWidth: 1,
        backgroundColor: '#d2f7f1',
    },
    listItem: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
    },
    inputSearch: {
        height: 40,
        width: 300,
        fontSize: 15,
        color: '#161F3D',
        borderColor: '#8A8F9E',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        margin: 10,
    },
    listItemButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    listItemButton: {
        backgroundColor: '#E9446A',
        borderRadius: 4,
        height: 52,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        margin: 5,
    },
    listItemButtonText: {
        color: '#FFF',
        fontSize: 15,
        fontWeight: 'bold',
    },
    listContainer: {
        flex: 1,
        width: '100%',
        padding: 16,
    },
    
    

});
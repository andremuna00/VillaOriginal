import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#301934',
        justifyContent: 'center',
    },
    image: {
        flex: 1,
        justifyContent: "center",
        alignItems: 'center'
      },
    greeting: {
        marginTop: 32,
        fontSize: 18,
        fontWeight: '400',
        textAlign: 'center',
    },
    editTitle: {
        margin: 32,
        fontSize: 25,
        fontWeight: '600',
        color: '#fdfdfe',
        textShadowColor: '#b393d3',
        textShadowOffset: {
        width: 0,
        height: 0,
        },
        textShadowRadius: 5,
        textShadowRadius: 10,
        textShadowRadius: 10,
        textShadowRadius: 20,
    },
    secondaryText:{
        color: '#FFF',
        fontSize: 15,
        fontStyle: 'italic',

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
        marginBottom: 25,
        color: '#fff',
    },
    goBack: {
        color: '#8A8F9E',
        fontSize: 15,
        fontWeight: '500',
        textAlign: 'center',

    },
    button: {
        backgroundColor: '#000000',
        opacity: 0.6,
        borderRadius: 5,
        height: 52,
        margin:30,
        flexDirection: 'row',
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
        fontStyle: 'italic',
        margin: 32,
        fontSize: 40,
        fontWeight: '600',
        color: '#fdfdfe',
        textShadowColor: '#b393d3',
        textShadowOffset: {
        width: 0,
        height: 0,
        },
        textShadowRadius: 5,
        textShadowRadius: 10,
        textShadowRadius: 10,
        textShadowRadius: 20,
    },
    verticalWrapper: {
        flex: 1,
        flexDirection: 'column',
        marginTop:70,
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
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        padding: 10,
        margin: 2,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        width: '100%',
    },
    listItem: {
        fontSize: 15,
        margin: 10,
        fontStyle: 'italic',
        color: '#fff',
    },
    listItemTitle: {
        fontSize: 20,
        margin: 10,
        fontWeight: 'bold',
        color: '#fff',
    },
    inputSearch: {
        height: 40,
        width: 300,
        fontSize: 15,
        color: '#fff',
        borderColor: '#8A8F9E',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        margin: 10,
    },
    listItemTitleBarred:
    {
        fontSize: 20,
        margin: 10,
        fontWeight: 'bold',
        backgroundColor: '#8A8F9E22',
        color: '#8A8F9E',
        textDecorationLine: 'line-through',
    },
    listItemSeparator: {
        height: 1,
        width: '100%',
        backgroundColor: '#ccc',
    },
    listItemButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    listItemButton: {
        backgroundColor: '#000000',
        opacity: 0.6,
        borderRadius: 5,
        height: 52,
        margin:10,
        alignItems: 'center',
        justifyContent: 'center',
        padding:10
    },
    listItemButtonText: {
        color: '#FFF',
        fontSize: 15,
        fontWeight: 'bold',
    },
    
    listItemView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: 4,
        alignItems: 'center',
    },
    listContainer: {
        flex: 1,
        width: '100%',
        padding: 16,
    },
    
    

});
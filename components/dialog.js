// import React from 'react';
// import {
//   Button,
//   Dialog as PaperDialog,
//   Portal,
//   RadioButton,
// } from 'react-native-paper';
// import { useDispatch, useSelector } from 'react-redux';

// import { bookSelector, setSelectedShelf } from '../redux/slices/book-slice';
// import { closeDialog, dialogSelector } from '../redux/slices/dialog-slice';
// import { updateShelf } from '../redux/slices/library-slice';

// const Dialog = () => {
//   const dispatch = useDispatch();

//   const { selectedShelf, shelfId, updating } = useSelector(bookSelector);

//   const { isDialogVisible } = useSelector(dialogSelector);

//   const getDialogContent = dialogContent => (
//     <>
//       <PaperDialog.Title>Seleccionar estantería</PaperDialog.Title>
//       <PaperDialog.Content>
//         <RadioButton.Group
//           onValueChange={selectedShelf =>
//             dispatch(setSelectedShelf(selectedShelf))
//           }
//           value={selectedShelf}
//         >
//           <RadioButton.Item label="Favoritos" value="0" />
//           <RadioButton.Item label="Por leer" value="2" />
//           <RadioButton.Item label="Leyendo ahora" value="3" />
//           <RadioButton.Item label="Leídos" value="4" />
//         </RadioButton.Group>
//       </PaperDialog.Content>
//       <PaperDialog.Actions>
//         <Button
//           onPress={() => {
//             dispatch(updateShelf(route.params, selectedShelf, shelfId));
//           }}
//           disabled={updating}
//         >
//           Seleccionar
//         </Button>
//       </PaperDialog.Actions>
//     </>
//   );

//   return (
//     <Portal>
//       <PaperDialog
//         onDismiss={() => dispatch(closeDialog())}
//         visible={isDialogVisible}
//       >
//         {getDialogContent()}
//       </PaperDialog>
//     </Portal>
//   );
// };

// export default Dialog;

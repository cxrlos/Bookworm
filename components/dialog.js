import React from 'react';
import { Dialog as PaperDialog, Portal } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';

import { closeDialog, dialogSelector } from '../redux/slices/dialog-slice';

const Dialog = ({ children }) => {
  const dispatch = useDispatch();

  const { isDialogVisible } = useSelector(dialogSelector);

  return (
    <Portal>
      <PaperDialog
        onDismiss={() => dispatch(closeDialog())}
        visible={isDialogVisible}
      >
        {children}
      </PaperDialog>
    </Portal>
  );
};

export default Dialog;

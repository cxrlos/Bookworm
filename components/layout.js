import React from 'react';
import { RefreshControl, ScrollView } from 'react-native';
import { Snackbar, withTheme } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { FORM } from '../constants';

import {
  closeSnackBar,
  openSnackBar,
  snackBarSelector,
} from '../redux/slices/snack-bar-slice';

/**
 * Represents the basic layout of any screen.
 * @param {Object} children -
 * @param {boolean} isVerticallyCentered -
 * @param {boolean} onRefresh - Used to indicate of the screen can be refreshed or not
 * @param {boolean} refreshing - Used when the children are being loaded or not
 * @param {-------} style -
 * @param {-------} colors -
 */

const Layout = ({
  children,
  isVerticallyCentered,
  onRefresh,
  refreshing,
  style,
  theme: { colors },
}) => {
  const { firebaseErrors } = FORM;

  const snackBarMessages = { ...firebaseErrors };

  const dispatch = useDispatch();

  const { isSnackBarVisible, snackBarMessage } = useSelector(snackBarSelector);

  return (
    <>
      <ScrollView
        contentContainerStyle={{
          ...(isVerticallyCentered && { flex: 1, justifyContent: 'center' }),
        }}
        style={{ backgroundColor: colors.background, ...style }}
        refreshControl={
          onRefresh ? (
            <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
          ) : undefined
        }
      >
        {!refreshing && children}
      </ScrollView>
      <Snackbar
        action={{
          label: 'Cerrar',
          onPress: () => dispatch(closeSnackBar()),
        }}
        onDismiss={() => dispatch(closeSnackBar())}
        visible={isSnackBarVisible}
      >
        {snackBarMessages[snackBarMessage]}
      </Snackbar>
    </>
  );
};

export default withTheme(Layout);

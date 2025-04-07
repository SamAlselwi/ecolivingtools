'use clinet';

import { useState } from 'react';
import { IProgress, ErrorObj } from '../interfaces';
import { format } from 'date-fns'


const useProgress = () => {
  const [progress, setProgress] = useState<IProgress>({
    isLoading: false,
    message: '',
    toastShow: false,
    autohide: false,
    isError: false,
  });

  const updateProgress = (
    isLoading: boolean,
    toastShow: boolean,
    message: ErrorObj | string = '',
    isError: boolean = false,
    autohide: boolean = false
  ) => {
    setProgress({
      ...process,
      isLoading: isLoading,
      toastShow: toastShow,
      message: message,
      isError: isError ? true : false,
      color: isError ? 'danger' : 'success',
      autohide: autohide ? autohide : false,
    });
  };

  const hideToast = () => setProgress({ ...progress, toastShow: false });

  const toastData = {
    toastShow: progress.toastShow,
    message: progress.message as ErrorObj | string,
    isError: progress.isError as boolean,
  };

  return {
    isLoading: progress.isLoading,
    message: progress.message,
    toastShow: progress.toastShow,
    updateProgress,
    toastData,
    hideToast,
  };
};

// const useMobileMenu = () => {
//   const [show, setShow] = useState(false);
//   const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);

//   return {show, handleClose, handleShow};
// }

const formatDate = (date: Date) => {
  return format(new Date(date), 'd MMM y, H:mm')
}

export { useProgress, formatDate }


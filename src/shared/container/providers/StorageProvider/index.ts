import { container } from 'tsyringe';

import { LocalStorageProvider } from './Implementatios/LocalStorageProvider';
import { IStorageProvider } from './IStorageProvider';

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  LocalStorageProvider,
);

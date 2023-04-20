import { IAuth } from './iauth';
import { IDebts } from './idebts';

export interface UserProps {
    auth : IAuth
    debts : IDebts
}
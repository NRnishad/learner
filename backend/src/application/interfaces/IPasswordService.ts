export interface IPasswordService {
    hash(password: string): Promise<string>
    compare(plainText:string, hashed:string) : Promise<boolean>;
}
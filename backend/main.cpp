#include <iostream>
#include "rsa.h"

using namespace std;

int main() {

    RSA rsa;

    // Temporary test primes
    rsa.generateKeys(61, 53);

    rsa.displayKeys();

    long long message;

    cout << "\nEnter a number to encrypt: ";
    cin >> message;

    long long encrypted = rsa.encrypt(message);
    long long decrypted = rsa.decrypt(encrypted);

    cout << "\nEncrypted: " << encrypted << endl;
    cout << "Decrypted: " << decrypted << endl;

    return 0;
}
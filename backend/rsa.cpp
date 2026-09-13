#include "rsa.h"
#include <iostream>

using namespace std;

RSA::RSA() {
    p = q = n = phi = e = d = 0;
}

long long RSA::gcd(long long a, long long b) {
    while (b != 0) {
        long long temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}

long long RSA::modPow(long long base, long long exponent, long long modulus) {
    long long result = 1;

    while (exponent > 0) {
        if (exponent % 2 == 1) {
            result = (result * base) % modulus;
        }

        base = (base * base) % modulus;
        exponent /= 2;
    }

    return result;
}
void RSA::generateKeys(long long prime1, long long prime2) {

    p = prime1;
    q = prime2;

    n = p * q;

    phi = (p - 1) * (q - 1);

    // Choose a small e such that gcd(e, phi) = 1
    e = 2;

    while (e < phi) {
        if (gcd(e, phi) == 1) {
            break;
        }
        e++;
    }

    // Find d such that (d * e) % phi = 1
    d = 1;

    while ((d * e) % phi != 1) {
        d++;
    }
}
long long RSA::encrypt(long long message) {
    return modPow(message, e, n);
}

long long RSA::decrypt(long long cipher) {
    return modPow(cipher, d, n);
}

void RSA::displayKeys() {

    cout << "\n========== RSA KEYS ==========\n";

    cout << "p       : " << p << endl;
    cout << "q       : " << q << endl;
    cout << "n       : " << n << endl;
    cout << "phi(n)  : " << phi << endl;

    cout << "\nPublic Key\n";
    cout << "e = " << e << endl;
    cout << "n = " << n << endl;

    cout << "\nPrivate Key\n";
    cout << "d = " << d << endl;
    cout << "n = " << n << endl;

    cout << "==============================\n";
}
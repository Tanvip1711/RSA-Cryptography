#ifndef RSA_H
#define RSA_H

class RSA {
private:
    long long p, q;
    long long n;
    long long phi;
    long long e;
    long long d;

    long long gcd(long long a, long long b);
    long long modPow(long long base, long long exponent, long long modulus);
    long long modInverse(long long e, long long phi);
    bool isPrime(long long num);

public:
    RSA();

    void generateKeys(long long p, long long q);

    long long encrypt(long long message);
    long long decrypt(long long cipher);

    void displayKeys();
};

#endif
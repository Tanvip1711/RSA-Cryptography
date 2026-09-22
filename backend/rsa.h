#ifndef RSA_H
#define RSA_H

#include <string>
#include <vector>

class RSA
{
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

    bool generateKeys(long long p, long long q);

    long long encrypt(long long message);
    long long decrypt(long long cipher);

    std::vector<long long> encryptText(const std::string& text);
    std::string decryptText(const std::vector<long long>& cipher);

    long long getP() const;
    long long getQ() const;
    long long getN() const;
    long long getPhi() const;
    long long getE() const;
    long long getD() const;

    void displayKeys();
};

#endif
# DirectGo Mac Kurulum Rehberi

Bu proje bir Next.js uygulamasıdır. Projeyi bir MacBook üzerinde (veya herhangi bir macOS sisteminde) çalıştırmak için aşağıdaki adımları sırasıyla uygulayabilirsiniz.

## 1. Gerekli Kurulumlar

Mac'inizde öncelikle Homebrew ve Node.js'in kurulu olması gereklidir.

### Homebrew Kurulumu (Eğer yüklü değilse)
Terminal'i açın (Cmd + Space basıp "Terminal" yazın) ve aşağıdaki komutu yapıştırın:
```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

### Node.js ve Git Kurulumu
Homebrew ile Node.js ve Git'i yüklemek için:
```bash
brew install node
brew install git
```
*(Not: Node.js versiyonunuzun 18 ve üzeri olmasına dikkat edin. Bunu `node -v` yazarak kontrol edebilirsiniz.)*

## 2. Projeyi Bilgisayara İndirme (Clone)

Terminal'de projeyi kurmak istediğiniz dizine gidin (örneğin Masaüstü):
```bash
cd ~/Desktop
```

Projeyi GitHub'dan bilgisayarınıza klonlayın:
```bash
git clone https://github.com/AliDenizz/web.git
```

## 3. Bağımlılıkların Kurulması ve Çalıştırma

Klonladığınız proje klasörünün içine girin:
```bash
cd web
```

Gerekli olan tüm NPM paketlerini (bağımlılıkları) kurun:
```bash
npm install
```

Kurulum bittikten sonra geliştirme sunucusunu başlatın:
```bash
npm run dev
```

## 4. Tarayıcıda Görüntüleme

Terminalde komutu çalıştırdıktan sonra `http://localhost:3000` adresine giderek sitenin çalıştığını görebilirsiniz.

---
**Karşılaşabileceğiniz Sorunlar:**
- Eğer Node.js sürümünüz eskiyse NVM (Node Version Manager) kullanarak güncel sürümü indirebilirsiniz.
- Projede `.env` ortam değişkenlerine ihtiyaç duyulursa, mevcut klasörde `.env.local` oluşturup gerekli API anahtarlarını girmeniz gerekebilir.

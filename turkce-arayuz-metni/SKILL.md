---
name: turkce-arayuz-metni
description: Writing and formatting Turkish user-facing text in apps and websites (Türkçe arayüz metni). Use when writing or reviewing Turkish UI strings, buttons, error messages, notifications, emails or store listings; when attaching Turkish case suffixes to dynamic values (brand names, numbers, dates, abbreviations, e.g. "Trendyol'dan", "PTT'den", "3'te"); when upper/lower-casing, sorting or searching Turkish text; or when formatting TL amounts and Turkish dates.
---

# Türkçe Arayüz Metni

Amaç: Metin, bir Türk uygulamasının yazacağı gibi doğal okunsun. Çeviri kokmasın, dil bilgisi hatası olmasın.

## 1. Ton ve üslup
- Proje başında **"sen" ya da "siz"** seçilir ve her yerde tutarlı kullanılır. Projenin CLAUDE.md'sinde yazıyorsa ona uy. Yasal metinler "siz" ile yazılabilir.
- Kısa, etken, fiille biten cümleler kur. Resmi ve bürokratik kalıplardan kaçın.

| Çeviri kokan ❌ | Doğal ✅ |
|---|---|
| Bu işlemi gerçekleştirmek istediğinize emin misiniz? | Silinsin mi? |
| Başarıyla kaydedildi. | Kaydedildi. |
| Lütfen tekrar deneyiniz. | Tekrar dene. |
| Bir hata meydana geldi. | Bir şeyler ters gitti. Tekrar dener misin? |
| Kaydetme işlemini gerçekleştir | Kaydet |
| İçerik bulunamamaktadır. | Henüz kupon yok. |

- **Düğmeler** fiildir ve sonucu söyler: "Kopyala", "Takvime ekle", "Haritada aç". Belirsiz "Tamam" yerine mümkünse eylemi yaz.
- **Hata mesajı** üç şey söyler: ne oldu, neden (gerekirse), ne yapmalı. Kullanıcıyı suçlamaz, teknik terim içermez.
- **Bildirim** kısadır: somut bilgi + eylem. Örnek: "Getir kuponunun son günü yarın. Kodu kopyalamak için dokun."
- Emoji ölçülü kullanılır. Başlık ya da ton desteği için uygundur, cümle içinde süs olarak kullanılmaz.

## 2. Dinamik değerlere ek getirmek (en sık hata)
Kodda `${marka}'den` gibi sabit bir ek yazmak yanlıştır: "Trendyol'den" ❌.

**En güvenli yol, cümleyi ek gerektirmeyecek şekilde kurmaktır:**
- "Trendyol'dan kupon" yerine "Trendyol kuponu" ya da "Kaynak: Trendyol"
- "15 Ekim'de" yerine "Tarih: 15 Ekim"
- "3 gün sonra"daki sayıya ek gerekmez, sayı ekten önce zaten okunuyor.

Ek kaçınılmazsa test edilmiş bir yardımcı fonksiyon yaz ve aşağıdaki kuralları uygula. Ek, **kelimenin okunuşuna** göre seçilir:
- **Kesme işareti:** Özel adlar, kısaltmalar ve rakamlardan sonra ek kesmeyle ayrılır: "Getir'de", "PTT'ye", "3'te".
- **Büyük ünlü uyumu:** Son ünlü a, ı, o, u ise -a, -da, -dan, -ın; e, i, ö, ü ise -e, -de, -den, -in.
- **Dar ünlülü ekler:** a, ı → ı · e, i → i · o, u → u · ö, ü → ü (ör. -ın, -in, -un, -ün).
- **Sertleşme:** Son ses f, s, t, k, ç, ş, h, p ise -da/-dan yerine -ta/-tan, -de/-den yerine -te/-ten.
- **Kaynaştırma:** Ünlüyle biten kelimeye ünlüyle başlayan ek gelince araya y (yönelme) ya da n (iyelik ekli kelimelerde) girer.
- **Yabancı adlar** okunuşa göre çekilir: "Netflix'te" (iks → s), "Spotify'da" (fay → a), "Exxen'de".
- **İyelik ekli birleşik adlar** n alır: "Yemeksepeti'nde", "Yemeksepeti'nden" ❗

| Değer | -de/-da | -den/-dan | -e/-a |
|---|---|---|---|
| Trendyol | Trendyol'da | Trendyol'dan | Trendyol'a |
| Getir | Getir'de | Getir'den | Getir'e |
| Hepsiburada | Hepsiburada'da | Hepsiburada'dan | Hepsiburada'ya |
| Netflix | Netflix'te | Netflix'ten | Netflix'e |
| PTT (pe-te-te) | PTT'de | PTT'den | PTT'ye |
| THY (te-ha-ye) | THY'de | THY'den | THY'ye |
| ÖSYM (ö-se-ye-me) | ÖSYM'de | ÖSYM'den | ÖSYM'ye |
| Ekim (tarih) | 15 Ekim'de | 15 Ekim'den | 15 Ekim'e |

**Sayılar** okunuşa göre çekilir: 1'de, 2'de, 3'te, 4'te, 5'te, 6'da, 7'de, 8'de, 9'da, 10'da, 20'de, 30'da, 40'ta, 50'de, 60'ta, 70'te, 80'de, 90'da, 100'de, 1000'de. Kural son okunan kelimeye bakar: 14 "on dört" → 14'te; 1250 "bin iki yüz elli" → 1250'de.

**Saatler** için de aynı kural geçerli: 14.00'te (dört), 20.30'da (otuz), 09.00'da (dokuz), 12.00'de (iki).

**Çoğul:** Sayıdan sonra isim tekil kalır: "3 kupon" ✅, "3 kuponlar" ❌. "kupon(lar)" gibi yazımlardan kaçın.

## 3. Büyük/küçük harf, sıralama, arama (kodda)
- JavaScript'in varsayılan dönüşümleri Türkçede yanlıştır:
  - `'i'.toUpperCase()` → `"I"` (doğrusu "İ")
  - `'I'.toLowerCase()` → `"i"` (doğrusu "ı")
  - `'İ'.toLowerCase()` → `"i̇"`, yani iki karakter; metin uzunluğu değişir!
- Doğrusu `str.toLocaleUpperCase('tr-TR')` ve `str.toLocaleLowerCase('tr-TR')`. React Native'de (Hermes) cihazda doğrula.
- CSS `text-transform: uppercase` yalnızca sayfa ya da öğe `lang="tr"` ise Türkçe kurala uyar. React Native'de `textTransform` yerine metni önceden doğru harfle yaz.
- Türkçe sıralama: `a.localeCompare(b, 'tr')` ya da `new Intl.Collator('tr')`. Doğru sıra: c → ç, g → ğ, ı → i, o → ö, s → ş, u → ü.
- Arama, Türkçe harften bağımsız olmalı: "kasim" yazan "Kasım"ı, "istanbul" yazan "İSTANBUL"u bulmalı. Karşılaştırma için iki tarafı aynı biçime katla (ı/i, ş/s, ğ/g, ü/u, ö/o, ç/c), gösterimde orijinali kullan.
- Kullanıcıya görünen metinde Türkçe karakterler eksiksiz yazılır: "Sıradaki" ✅, "Siradaki" ❌.

## 4. Sayı, para, tarih biçimleri
- **Para:** "1.250,00 TL" ya da "₺1.250,00". Projede biri seçilir ve tutarlı kullanılır. Binlik ayracı nokta, ondalık ayracı virgüldür. `new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' })` → "₺1.250,00". Kuruş hesaplarında ondalıklı sayı yerine tamsayı kuruş kullan.
- **Tarih:** "31 Ekim 2026 Cumartesi", kısası "31.10.2026". Ay ve gün adları büyük harfle başlar: Ocak, Şubat, Mart, Nisan, Mayıs, Haziran, Temmuz, Ağustos, Eylül, Ekim, Kasım, Aralık · Pazartesi, Salı, Çarşamba, Perşembe, Cuma, Cumartesi, Pazar. Hafta pazartesi başlar.
- **Saat:** 24 saat biçimi. Arayüzde "23:59" (iki nokta) tutarlı kullanılır. Tanıma yaparken "23.59" de kabul edilir.
- **Yüzde:** "%20", işaret sayıdan önce gelir.
- `Intl` desteği React Native'de cihaza göre değişebilir. Kritik biçimler için test edilmiş kendi yardımcı fonksiyonunu kullan ya da cihazda doğrula.

## 5. Sık yapılan yazım hataları
- "her şey", "bir şey", "hiçbir şey" ("hiçbir" bitişik, "her şey" ayrı) · "yalnız" ("yanlız" ❌) · "yanlış" ("yalnış" ❌)
- Bağlaç olan "de/da" ve "ki" ayrı yazılır: "Sen de gel." · Soru eki "mi" ayrı yazılır, kendinden önceki kelimeye uyar: "Silinsin mi?", "Geliyor musun?"
- Kurum ve marka adlarının yazımı resmi biçimine uyar: "Türk Telekom", "Garanti BBVA", "e-Devlet", "e-Nabız", "MHRS".

## 6. Tasarım notları
- Türkçe kelimeler İngilizce karşılıklarından ortalama daha uzundur. Düğme ve başlıkların taşmadan sığdığını en dar ekranda ve büyük yazı ayarında kontrol et. Metni kesip "…" ile bırakmak son çaredir.
- Seçilen yazı tipinin ğ, ş, ı, İ, ç, ö, ü harflerini düzgün çizdiğini gerçek render'da kontrol et. Bazı yazı tiplerinde "İ" ve "ş" bozuk görünür.

## Kontrol listesi (metin teslim etmeden önce)
- [ ] Ton (sen/siz) tutarlı
- [ ] Çeviri kalıbı yok, düğmeler fiil
- [ ] Dinamik değerlere eklenen ekler doğru ya da cümle ek gerektirmeyecek şekilde kurulmuş
- [ ] Türkçe karakterler tam; büyük/küçük harf dönüşümleri `tr-TR` ile
- [ ] Para, tarih ve saat biçimleri tutarlı
- [ ] En dar ekranda ve büyük yazıda taşma yok

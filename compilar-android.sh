#!/bin/sh
echo "*** Compilando Android APK... ***\n"

ionic build --release android

cp release-signing.properties platforms/android/release-signing.properties
cd platforms/android/build/outputs/apk

rm cleansuit-armv7.apk
rm cleansuit-x86.apk

# echo "*** Firmando versión ARM... ***\n"
# /usr/local/java/jdk1.8.0_71/bin/jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore ../../../../../cleansuit.keystore -storepass cleansuitMCkako.2554 android-armv7-release-unsigned.apk CleansuitAppCliente
# echo "*** Firmando versión x86... ***\n"
# /usr/local/java/jdk1.8.0_71/bin/jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore ../../../../../cleansuit.keystore -storepass cleansuitMCkako.2554 android-x86-release-unsigned.apk CleansuitAppCliente

echo "*** Optimizando APK ARM... ***\n"
/opt/Android/Sdk/build-tools/23.0.2/zipalign -v 4 android-armv7-release-unsigned.apk cleansuit-armv7.apk
echo "*** Optimizando APK x86... ***\n"
/opt/Android/Sdk/build-tools/23.0.2/zipalign -v 4 android-x86-release-unsigned.apk cleansuit-x86.apk

cd ../../../../..

echo "*** Proceso terminado. Revise platforms/android/build/outputs/apk. ***\n"
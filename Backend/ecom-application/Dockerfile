FROM maven:3.9.6-eclipse-temurin-21 AS build

WORKDIR /app

COPY pom.xml .

RUN mvn dependency:go-offline

COPY src ./src

RUN mvn clean package -DskipTests && \
    find target -maxdepth 1 -type f \
    -name "*.jar" ! -name "*original*" \
    -exec cp {} app.jar \;

FROM eclipse-temurin:21-jre

WORKDIR /app

COPY --from=build /app/app.jar app.jar

EXPOSE 10000

CMD ["java", "-jar", "app.jar"]
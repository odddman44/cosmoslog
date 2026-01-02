package org.cosmoslog.demo.global.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

	@Bean
	SecurityFilterChain filterChain( HttpSecurity http ) throws Exception {
		http
				.csrf(csrf -> csrf.disable())
				.authorizeHttpRequests(auth -> auth
						.requestMatchers( "/health" ).permitAll()
						.anyRequest().authenticated()
				)
				// 개발 단계에서, 일단 basic auth 켜두기
				.httpBasic( Customizer.withDefaults());

		return http.build();
	}
}

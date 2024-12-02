package com.times.times.dto;


public class TimesDTO {

    private Long id;
    private String nome;
    private String tecnico;
    private String logo;

   
    public TimesDTO() {
    }

    public TimesDTO(String nome, String tecnico, String jogadores, String logo) {
        this.nome = nome;
        this.tecnico = tecnico;
        this.logo = logo;
    }

    public TimesDTO(Long id, String nome, String tecnico, String jogadores, String logo) {
        this.id = id;
        this.nome = nome;
        this.tecnico = tecnico;
        this.logo = logo;
    }

  
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getTecnico() {
        return tecnico;
    }

    public void setTecnico(String tecnico) {
        this.tecnico = tecnico;
    }


    public String getLogo() {
        return logo;
    }

    public void setLogo(String logo) {
        this.logo = logo;
    }
}
